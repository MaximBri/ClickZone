import random
from datetime import datetime, timezone, timedelta

from flask_jwt_extended import jwt_required, get_jwt_identity, get_current_user, \
    create_access_token, set_access_cookies

from flask import make_response, request, jsonify
from pydantic import ValidationError

from app.main import bp
from app import jwt, db, Config
from app.models import User, DailyReward, Upgrade, DBSessionManager, UserUpgrade, Container, UserContainer, \
    UserAchievement, Achievement
from app.errors import validation_error, default_error
from .validators import UpgradeForm, ContainerForm, ResourceForm, IdUpgradeForm, IdContainerForm, IdAchievementForm, \
    AmountKeyForm
from .services import calculate_max_click_coins


@jwt.user_lookup_loader
def load_user(_jwt_header, jwt_data):
    identity = jwt_data.get('sub')
    return User.query.filter_by(id=int(identity)).first()


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()

    response = make_response({'msg': 'Token refreshed'}, 200)
    access_token = create_access_token(identity=identity)
    set_access_cookies(response, access_token)

    return response


@bp.route('/check-auth', methods=['POST'])
@jwt_required()
def check_auth():
    user = get_current_user()
    if not user:
        response = make_response({'errors': [{'msg': 'User not found'}]}, 401)
        return response
    user_upgrades = []
    for user_upgrade in user.upgrades.all():
        upgrade = user_upgrade.upgrade
        user_upgrades.append(
            {
                'id': upgrade.id,
                'name': upgrade.name,
                'description': upgrade.description,
                'quantity': user_upgrade.quantity,
                'image_path': upgrade.image_path,
                'type': upgrade.upgrade_type,
                'effect': upgrade.effect_type,
                'cost_coins': upgrade.cost_coins,
                'cost_diamonds': upgrade.cost_diamonds,
                'multiplier': upgrade.multiplier
            })
    user_containers = []
    for user_container in user.containers:
        container = user_container.container
        container_dict = container.to_dict_self()
        container_dict['quantity'] = user_container.quantity
        user_containers.append(container_dict)

    response = {
        'id': user.id,
        'nickname': user.name,
        'about_me': user.about_me if user.about_me else '',
        'upgrades': user_upgrades,
        'containers': user_containers,
        'resources': {
            'coins': user.coins,
            'diamonds': user.diamonds,
            'keys': user.keys
        },
        'coins_per_minute': user.base_per_minute,
        'coins_per_click': user.base_per_click
    }

    response = make_response(response, 200)
    return response


@bp.route('/daily-rewards', methods=['GET'])
@jwt_required()
def daily_rewards():
    return make_response(DailyReward.to_dict_all(), 200)


@bp.route('/daily-rewards/status', methods=['GET'])
@jwt_required()
def daily_rewards_status():
    user = get_current_user()
    reward_info = user.get_next_reward_info()
    return make_response(reward_info, 200)


@bp.route('/daily-rewards/claim', methods=['POST'])
@jwt_required()
def daily_rewards_claim():
    try:
        with DBSessionManager():
            user = get_current_user()
            reward: DailyReward = DailyReward.query.get(user.current_reward_day)

            if not reward:
                return jsonify({'errors': [{'msg': 'Reward not found'}]}, 404)
            if user.is_streak_broken():
                user.current_reward_day = 1
            if not user.can_claim_reward():
                return jsonify({'errors': [{'msg': 'Reward not available'}]}, 400)

            user.coins += reward.coins or 0
            user.diamonds += reward.diamonds or 0
            if reward.custom is not None:
                if '/miglioramenti/' in reward.custom:
                    upgrade_path = reward.custom.split('/')[-1]
                    upgrade = Upgrade.query.filter_by(image_path=upgrade_path).scalar()
                    if (existing_upgrade := UserUpgrade.query.filter_by(upgrade_id=upgrade.id).first()) is not None:
                        existing_upgrade.quantity += 1
                    else:
                        new_user_custom = UserUpgrade(user=user, upgrade=upgrade)
                        db.session.add(new_user_custom)
                else:
                    container_path = reward.custom.split('/')[-1]
                    container = Container.query.filter_by(image_path=container_path).scalar()
                    if (existing_container := UserContainer.query.filter_by(container_id=container.id).first()
                    ) is not None:
                        existing_container.quantity += 1
                    else:
                        new_user_custom = UserContainer(user=user, container=container)
                        db.session.add(new_user_custom)

            user.current_reward_day = user.current_reward_day % 14 + 1
            user.last_reward_claimed_at = datetime.now(timezone.utc)

        response = make_response(
            {'reward_id': reward.id, 'user_resources': {'coins': user.coins, 'diamonds': user.diamonds}}, 200)
        return response

    except Exception as e:
        return default_error(e)


@bp.route('/upgrades', methods=['POST', 'GET'])
@jwt_required()
def upgrades():
    if request.method == 'GET':
        response = make_response(Upgrade.to_dict(), 200)
        return response
    try:
        with DBSessionManager():
            form = UpgradeForm(**request.get_json())
            upgrade = Upgrade.query.get(form.id)
            user = get_current_user()

            if upgrade.upgrade_type == 'permanent':
                existing = db.session.query(UserUpgrade).filter_by(user_id=user.id, upgrade_id=upgrade.id).first()
                if existing:
                    return jsonify({'errors': [{'msg': 'Upgrade already purchased'}]}, 400)
            if user.coins < upgrade.cost_coins or user.diamonds < upgrade.cost_diamonds:
                return jsonify({'errors': [{'msg': 'Not enough coins or diamonds'}]})

            user.coins -= upgrade.cost_coins
            user.diamonds -= upgrade.cost_diamonds

            if upgrade.upgrade_type == 'permanent':
                user_upgrade = UserUpgrade(user=user, upgrade=upgrade, quantity=1)
            else:
                user_upgrade = user.upgrades.filter_by(upgrade_id=upgrade.id).first()
                if user_upgrade:
                    user_upgrade.quantity += 1
                else:
                    user_upgrade = UserUpgrade(user=user, upgrade=upgrade)
            db.session.add(user_upgrade)

        response = make_response({'user_coins': user.coins, 'user_diamonds': user.diamonds}, 200)
        return response

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/containers', methods=['GET', 'POST'])
@jwt_required()
def containers():
    if request.method == 'GET':
        response = make_response(Container.to_dict_all(), 200)
        return response
    try:
        with DBSessionManager():
            form = ContainerForm(**request.get_json())
            container = Container.query.get(form.id)
            user = get_current_user()

            if user.coins < form.cost_coins or user.diamonds < form.cost_diamonds:
                return jsonify({'errors': [{'msg': 'Not enough coins or diamonds'}]})

            user.coins -= form.cost_coins
            user.diamonds -= form.cost_diamonds

            user_container = user.containers.filter_by(container_id=container.id).first()
            if user_container:
                user_container.quantity += 1
            else:
                user_container = UserContainer(user=user, container=container)
                db.session.add(user_container)

        response = make_response({'user_coins': user.coins, 'user_diamonds': user.diamonds}, 200)
        return response

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/containers/claim', methods=['POST'])
@jwt_required()
def containers_claim():
    try:
        with DBSessionManager():
            form = IdContainerForm(**request.get_json())
            user = get_current_user()
            user_container: UserContainer = user.containers.filter_by(container_id=form.id).first()
            container_rewards: dict[str, str | int] = user_container.container.get_reward()

            if (coins := container_rewards.get('coins')) is not None:
                user.coins += coins
            if (diamonds := container_rewards.get('diamonds')) is not None:
                user.diamonds += diamonds
            if (keys_ := container_rewards.get('keys')) is not None:
                user.keys += keys_
            if (id := container_rewards.get('improvement_id')) is not None:
                upgrade: Upgrade = Upgrade.query.get(id)
                count = container_rewards.get('count')
                if upgrade.upgrade_type == 'permanent':
                    existing = db.session.query(UserUpgrade).filter_by(upgrade_id=id, user_id=user.id).first()
                    if existing:
                        return jsonify({'errors': [{'msg': 'Upgrade already purchased'}]}, 400)
                    user_upgrade = UserUpgrade(user=user, upgrade=upgrade, quantity=1)
                else:
                    user_upgrade = user.upgrades.filter_by(upgrade_id=id).first()
                    if user_upgrade:
                        user_upgrade.quantity += count
                    else:
                        user_upgrade = UserUpgrade(user=user, upgrade=upgrade, quantity=count)
                db.session.add(user_upgrade)
            if (id := container_rewards.get('container_id')) is not None:
                container: Container = Container.query.get(id)
                count = container_rewards.get('count')

                user_container = user.containers.filter_by(container_id=id).first()
                if user_container:
                    user_container.quantity += count
                else:
                    user_container = UserContainer(user=user, container=container, quantity=count)
                db.session.add(user_container)

            if user_container.quantity > 1:
                user_container.quantity -= 1
            else:
                db.session.delete(user_container)
            if form.use_key:
                user.keys -= 1
            return make_response({'msg': f'Приз получен!', 'reward': container_rewards}, 200)

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/resource-sync', methods=['POST'])
@jwt_required()
def resource_synchronization():
    try:
        with DBSessionManager():
            form = ResourceForm(**request.get_json())
            user = get_current_user()

            max_click_income = calculate_max_click_coins(user)

            if form.coins <= (user.coins + max_click_income) and form.diamonds <= user.diamonds:
                user.coins = form.coins
                user.diamonds = form.diamonds
                return make_response('', 200)
            else:
                return jsonify({'errors': [{'msg': 'Превышен допустимый лимит монет и(или) алмазов'}]}), 400

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/activate-upgrade', methods=['POST'])
@jwt_required()
def buy_upgrade():
    try:
        with DBSessionManager():
            form = IdUpgradeForm(**request.get_json())
            user = get_current_user()

            user_upgrade = user.upgrades.filter_by(upgrade_id=form.id).first()
            upgrade_name = user_upgrade.upgrade.name
            upgrade_type = user_upgrade.upgrade.upgrade_type
            reward_given = False
            reward_amount = 0

            if upgrade_type == 'consumable':
                match upgrade_name:
                    case 'Таинственный мешок':
                        rand = random.randint(1, 2)
                        if rand == 1:
                            reward_amount = 500
                            user.coins += reward_amount
                        reward_given = True
                    case 'Счастливый день':
                        rand = random.randint(1, 4)
                        if rand == 1:
                            reward_amount = 1000
                            user.coins += reward_amount
                        reward_given = True
                    case 'Сундук сокровищ':
                        reward_amount = random.randint(300, 1500)
                        user.coins += reward_amount
                        reward_given = True
                    case 'Клик удачи':
                        rand = random.randint(1, 10)
                        if rand == 1:
                            reward_amount = 50
                            user.diamonds += reward_amount
                        reward_given = True

                if reward_given:
                    user_upgrade.quantity -= 1
                    if user_upgrade.quantity <= 0:
                        db.session.delete(user_upgrade)

                    message = f"Улучшение '{upgrade_name}' активировано. "
                    message += f"Начислено {reward_amount} {'монет' if upgrade_name != 'Клик удачи' else 'алмазов'}."
            else:
                match upgrade_name:
                    case 'Улучшенный курсор':
                        user.base_per_click += 1
                    case 'Золотая перчатка':
                        user.base_per_click += 2
                    case 'Магический курсор':
                        user.base_per_click += 5
                    case 'Золотая фигурка':
                        user.base_per_click += 10
                    case 'Легендарный курсор':
                        user.base_per_click += 20
                    case 'Удвоитель дохода':
                        user.base_per_click *= 2
                    case 'Множитель дохода':
                        user.base_per_click *= 3

                user_upgrade.active = True
                message = f"Постоянное улучшение '{upgrade_name}' активировано."

            if user.upgrades.filter_by(upgrade_id=14, active=True).first() is not None:
                user.base_per_minute = user.base_per_click * 60

            if upgrade_name == 'Автокликер':
                user_upgrade.upgrade.multiplier = 2
                user_upgrade.active = True
            elif upgrade_name == 'Золотая лихорадка':
                user_upgrade.upgrade.multiplier = 2  # следующие 50 кликов по 2x (для одного клика — учитываем 2x)
                user_upgrade.active = True
            elif upgrade_name == 'Взрывные клики':
                user_upgrade.upgrade.multiplier = 10  # следующие 5 кликов по 10x
                user_upgrade.active = True
            elif upgrade_name == 'Магический артефакт':
                user_upgrade.upgrade.multiplier = 3  # временный множитель 3x за 30 секунд
                user_upgrade.active = True

            response = make_response({'msg': message,
                                      'user_coins': user.coins,
                                      'user_diamonds': user.diamonds,
                                      'upgrade_quantity': user_upgrade.quantity},
                                     200)
            return response

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/deactivate-upgrade', methods=['POST'])
@jwt_required()
def deactivate_upgrade():
    try:
        with DBSessionManager():
            form = IdUpgradeForm(**request.get_json())
            user = get_current_user()
            user_upgrade = user.upgrades.filter_by(
                upgrade_id=form.id,
                active=True
            ).first()

            if not user_upgrade:
                return make_response({'msg': 'Активное улучшение не найдено'}, 404)

            upgrade_name = user_upgrade.upgrade.name
            allowed_upgrades = {
                'Золотая лихорадка',
                'Взрывные клики',
                'Магический артефакт'
            }
            if upgrade_name not in allowed_upgrades:
                return make_response(
                    {'msg': 'Это улучшение нельзя деактивировать'},
                    400
                )
            user_upgrade.active = False
            if user_upgrade.quantity > 1:
                user_upgrade.quantity -= 1
            else:
                db.session.delete(user_upgrade)

            return make_response({
                'msg': f'Улучшение "{upgrade_name}" деактивировано',
                'active': user_upgrade.active
            }, 200)

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/achievements', methods=['POST'])
@jwt_required()
def achievements():
    try:
        with DBSessionManager():
            form = IdAchievementForm(**request.get_json())
            user = get_current_user()

            user_achievement = user.user_achievements.filter(
                UserAchievement.achievement_id == form.id and UserAchievement.user_id == user.id).first()
            if user_achievement is not None:
                return make_response({'msg': 'У пользователя уже есть такое достижение',
                                      'achievement': user_achievement.achievement.name}, 200)

            now = datetime.now(timezone.utc)
            if form.id == 1:
                # Новичок: накопить первую тысячу монет
                ok = user.coins >= 1_000
            elif form.id == 2:
                # Миллионер: накопить миллион монет
                ok = user.coins >= 1_000_000
            elif form.id == 3:
                # Магнат: накопить миллиард монет
                ok = user.coins >= 1_000_000_000
            elif form.id == 4:
                # Легионер: 30 дней с момента регистрации
                ok = (now - user.timestamp) >= timedelta(minutes=2)  # timedelta(days=30)
            elif form.id == 8:
                # Популярность: сменил никнейм 3+ раза
                ok = user.changes_number >= 3
            elif form.id == 11:
                # Первооткрыватель: первые 10 зарегистрировавшихся
                first_ten = (
                    User.query
                    .order_by(User.timestamp.asc())
                    .limit(10)
                    .all()
                )
                ok = user in first_ten
            else:
                return jsonify({
                    'errors': [{'msg': f'Автоматическая проверка неосуществлена для достижения с id: {form.id}'}]
                }), 400

            ua = UserAchievement(user=user, achievement=Achievement.query.get(form.id))
            db.session.add(ua)
            db.session.flush()
            if not ok:
                return jsonify({
                    'msg': 'Условие для получения этого достижения ещё не осуществлено',
                    'achievement': ua.achievement.name
                }), 400

            return jsonify({
                'msg': 'Улучшение разблокировано!',
                'achievement': ua.achievement.name
            }), 200

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/keys', methods=['POST'])
@jwt_required()
def keys():
    try:
        with DBSessionManager():
            form = AmountKeyForm(**request.get_json())
            user = get_current_user()
            user.keys += form.amount
            user.coins -= Config.KEYS_PRICE * form.amount

            return make_response('', 200)

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)
