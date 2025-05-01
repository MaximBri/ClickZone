import random

from flask import make_response, request, jsonify
from flask_jwt_extended import jwt_required, get_current_user
from pydantic import ValidationError

from app import db
from app.errors import validation_error, default_error
from app.models import Upgrade, DBSessionManager, UserUpgrade
from app.upgrades import bp
from .validators import UpgradeForm, IdUpgradeForm


@bp.route('/', methods=['POST', 'GET'])
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
