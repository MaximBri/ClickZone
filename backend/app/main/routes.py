from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, set_access_cookies, get_current_user
from flask import make_response

from app.main import bp
from app import jwt
from app.models import User


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


@bp.route('/check-auth', methods=['GET'])
@jwt_required()
def check_auth():
    user = get_current_user()
    if not user:
        response = make_response({'errors': [{'msg': 'User not found'}]}, 401)
        return response
    response = make_response()
    response.status_code = 200
    return response


@bp.route('/me', methods=['POST'])
@jwt_required()
def me():
    user = get_current_user()

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
