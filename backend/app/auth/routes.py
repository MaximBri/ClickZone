from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, \
    unset_jwt_cookies, jwt_required, decode_token
from pydantic import ValidationError

from config import Config
from app import db, redis
from app.auth import bp
from .validators import RegistrationForm, LoginForm
from app.models import User, DBSessionManager
from app.errors import validation_error, default_error


@bp.route('/registration', methods=['POST'])
def register():
    try:
        with DBSessionManager():
            form = RegistrationForm(**request.get_json())
            user = User(username=form.login)
            user.coins = 1000000
            user.diamonds = 100000
            user.can_change_name = True
            user.set_password(form.password)
            db.session.add(user)
            db.session.flush()

            response = make_response(user.user_dto(), 200)

            return response
    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/login', methods=['POST'])
def login():
    try:
        form = LoginForm(**request.get_json())
        user: User = User.query.filter_by(username=form.login).first()

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

        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        decoded_at = decode_token(refresh_token)
        rt_jti = decoded_at['jti']
        redis.set(f'refresh_jti:{user.id}', rt_jti, ex=Config.JWT_REFRESH_TOKEN_EXPIRES)

        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        return response

    except ValidationError as e:
        errors = e.errors()
        if any(err.get('msg') in 'Value error, Invalid login or password' for err in errors):
            return jsonify({'errors': [{'msg': 'Invalid login or password'}]}), 401
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = make_response({'msg': 'Logout success'}, 200)
    unset_jwt_cookies(response)
    return response
