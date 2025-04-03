from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, set_access_cookies, get_current_user
from flask import make_response, request, jsonify
from pydantic import ValidationError

from app.main import bp
from app import jwt, db
from app.models import User, DailyReward, Upgrade, DBSessionManager, UserUpgrade
from app.errors import validation_error, default_error
from .validation import UpgradeForm


@jwt.user_lookup_loader
def load_user(_jwt_header, jwt_data):
    identity = jwt_data.get('sub')
    return User.query.filter_by(id=identity).first()


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
                'type': upgrade.upgrade_type,
                'effect': upgrade.effect_type,
                'cost_coins': upgrade.cost_coins,
                'cost_diamonds': upgrade.cost_diamonds,
                'multiplier': upgrade.multiplier
            })

    response = {
        'id': user.id,
        'nickname': user.name,
        'about_me': user.about_me if user.about_me else '',
        'upgrades': user_upgrades,
        'resources': {
            'coins': user.coins,
            'diamonds': user.diamonds
        },
        'coins_per_minute': user.base_per_minute,
        'coins_per_click': user.base_per_click
    }
    response = make_response(response, 200)
    return response


@bp.route('/daily-rewards', methods=['GET'])
@jwt_required()
def daily_rewards():
    return make_response(DailyReward.to_dict(), 200)


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
                db.session.add(user_upgrade)
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
