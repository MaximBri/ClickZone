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
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if username and password:
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            response = make_response({'msg': 'Success'}, 200)

            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response

    return jsonify({'msg': 'Bad username or password'}), 401


@bp.route('/logout', methods=['POST'])
@jwt_required
def logout():
    response = make_response({'msg': 'Logout success'}, 200)
    unset_jwt_cookies(response)

    return response
