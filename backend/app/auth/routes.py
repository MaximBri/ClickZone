from flask import request, jsonify
from pydantic import ValidationError

from app import db
from app.auth import bp
from .validation import RegistrationForm
from app.models import User, DBSessionManager
from .services import create_registration_response, process_validation_errors


@bp.route('/registration', methods=['POST'])
def register():
    try:
        with DBSessionManager():
            form = RegistrationForm(**request.get_json())
            user = User(username=form.login)
            user.set_password(form.password)
            db.session.add(user)
            db.session.flush()
            return create_registration_response(user)

    except ValidationError as e:
        return process_validation_errors(e)

    except Exception as e:
        print(f'Unexpected error: {e}')
        return jsonify({'message': 'Произошла ошибка на сервере'}), 500


@bp.route('/login', methods=['POST'])
def login():
    print(request.data)
