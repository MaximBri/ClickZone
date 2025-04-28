from flask_jwt_extended import unset_jwt_cookies
from flask import make_response

from app import jwt, redis


@jwt.invalid_token_loader
def invalid_token_callback(error: str):
    response = make_response({'errors': [{'msg': f'Invalid token ({error})'}]}, 401)
    unset_jwt_cookies(response)
    return response


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    token_type = jwt_payload['type']
    if token_type == 'access':
        return make_response({'errors': [{'msg': 'Access token expired'}]}, 401)

    response = make_response({'errors': [{'msg': 'Refresh token has expired, please log again'}]}, 401)
    unset_jwt_cookies(response)
    return response


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    token_type = jwt_payload['type']
    identity = jwt_payload['sub']

    if token_type == 'access':
        return False

    raw = redis.get(f'refresh_jti:{identity}')
    if raw is None:
        return True
    return jti != raw


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    response = make_response({'errors': [{'msg': 'Token has been revoked'}]}, 401)
    unset_jwt_cookies(response)
    return response


@jwt.unauthorized_loader
def missing_token_callback(error: str):
    response = make_response({'errors': [{'msg': f'Token missing ({error})'}]}, 401)
    unset_jwt_cookies(response)
    return response
