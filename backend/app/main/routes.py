from datetime import datetime, timezone, timedelta

from flask import make_response, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_current_user, \
    create_access_token, set_access_cookies
from pydantic import ValidationError

from app import jwt, db, Config
from app.errors import validation_error, default_error
from app.main import bp
from app.models import User, DBSessionManager, UserAchievement, Achievement
from .services import calculate_max_click_coins
from .validators import ResourceForm, IdAchievementForm, AmountKeyForm


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


@bp.route('/resource-sync', methods=['POST'])
@jwt_required()
def resource_synchronization():
    try:
        with DBSessionManager():
            form = ResourceForm(**request.get_json())
            user = get_current_user()

            max_click_income = calculate_max_click_coins(user)

            if user.coins <= form.coins <= user.coins + max_click_income and form.diamonds == user.diamonds:
                user.coins = form.coins
                user.diamonds = form.diamonds
                return make_response('', 200)
            else:
                return jsonify({'errors': [{'msg': 'Превышен допустимый лимит монет и(или) алмазов'}]}), 400

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


@bp.route('/get-top-players', methods=['GET'])
def get_top_players():
    try:
        sort_param = request.args.get('sort', 'coins').lower()

        if sort_param == 'diamonds':
            top_users = User.query.order_by(User.diamonds.desc()).limit(10).all()
        else:
            top_users = User.query.order_by(User.coins.desc()).limit(10).all()

        response = make_response(
            [{
                'id': user.id,
                'name': user.name,
                'coins': user.coins,
                'diamonds': user.diamonds
            } for user in top_users], 200)
        return response
    except Exception as e:
        return default_error(e)


@bp.route('/get_player_info', methods=['GET'])
def get_player_info():
    try:
        user_id = request.args.get('id')
        if user_id is not None and user_id.isdigit():
            user = User.query.get(int(user_id))
            if user is None:
                return jsonify({'errors': [{'msg': 'Пользователя с таким id не существует'}]}), 400
            response = make_response(
                {
                    'nickname': user.name,
                    'about_me': user.about_me if user.about_me else '',
                    'achievements': user.achievements,
                    'timestamp': user.timestamp.isoformat()
                }, 200
            )
            return response
        return jsonify({'errors': [{'msg': 'Параметр id неотправлен или имеет некорректное значение'}]}), 400
    except Exception as e:
        return default_error(e)
