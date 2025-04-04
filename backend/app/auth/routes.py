from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, \
    unset_jwt_cookies, jwt_required
from pydantic import ValidationError

from app import db
from app.auth import bp
from .validation import RegistrationForm
from app.models import User, DBSessionManager
from app.errors import validation_error, default_error


@bp.route('/registration', methods=['POST'])
def register():
    try:
        with DBSessionManager():
            form = RegistrationForm(**request.get_json())
            user = User(username=form.login)
            user.coins = 1000
            user.diamonds = 100
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
    username = request.json.get('login', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({'errors': [{'msg': 'Username and password are required'}]}), 400

    user: User = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'errors': [{'msg': 'Invalid username or password'}]}), 401

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
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = make_response({'msg': 'Logout success'}, 200)
    unset_jwt_cookies(response)

    return response
