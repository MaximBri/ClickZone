from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, set_access_cookies
from flask import make_response

from app.main import bp
from app import jwt
from app.models import User


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()

    response = make_response({'msg': 'Token refreshed'}, 200)
    access_token = create_access_token(identity=identity)
    set_access_cookies(response, access_token)

    return response


@jwt.user_lookup_loader
def load_user(_jwt_header, jwt_data):
    identity = jwt_data.get('sub')
    return User.query.filter_by(id=identity).first()
