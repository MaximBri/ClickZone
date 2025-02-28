from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_current_user
from pydantic import ValidationError

from .validation import EditProfileForm
from app import db
from app.profile import bp
from app.errors import validation_error, default_error
from app.models import DBSessionManager


@bp.route('/edit_profile', methods=['POST'])
@jwt_required
def edit_profile():
    try:
        with DBSessionManager():
            form = EditProfileForm(**request.json())
            user = get_current_user()
            user.name = form.name
            user.about_me = form.about_me
            db.session.add(user)
            db.session.flush()

            return jsonify({'msg': 'Successfully updated name and about_me fields'}), 200

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)
