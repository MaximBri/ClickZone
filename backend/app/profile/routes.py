from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_current_user
from pydantic import ValidationError

from app.profile.validators import EditProfileForm
from app import db
from app.profile import bp
from app.errors import validation_error, default_error, InsufficientMoneyError
from app.models import DBSessionManager


@bp.route('/edit_profile', methods=['POST'])
@jwt_required()
def edit_profile():
    try:
        with DBSessionManager():
            form = EditProfileForm(**request.get_json())
            user = get_current_user()
            user.about_me = form.about_me
            if user.name != form.name:
                if user.can_change_name:
                    user.name = form.name
                    user.can_change_name = False
                    db.session.add(user)
                    db.session.flush()
                else:
                    cost = user.nickname_change_cost
                    if user.coins >= cost['coins'] and user.diamonds >= cost['diamonds']:
                        user.coins -= cost['coins']
                        user.diamonds -= cost['diamonds']
                        user.name = form.name
                    else:
                        raise InsufficientMoneyError("Not enough coins or diamonds to change name")
                user.changes_number += 1

            return jsonify({'msg': 'Successfully updated name or(and) about_me fields',
                            'nickname_price': user.nickname_change_cost,
                            'resources': {
                                'coins': user.coins,
                                'diamonds': user.diamonds
                            }
                            }), 200

    except ValidationError as e:
        return validation_error(e)
    except InsufficientMoneyError as e:
        raise e
    except Exception as e:
        return default_error(e)


@bp.route('/me', methods=['POST'])
@jwt_required()
def me():
    user = get_current_user()

    response = {
        'nickname': user.name,
        'about_me': user.about_me if user.about_me else '',
        'resources': {
            'coins': user.coins,
            'diamonds': user.diamonds
        },
        'achievements': user.achievements,
        'can_change_name': user.can_change_name,
        'changes_number': user.changes_number,
        'nickname_price': user.nickname_change_cost,
        'timestamp': user.timestamp.isoformat()
    }
    response = make_response(response, 200)
    return response
