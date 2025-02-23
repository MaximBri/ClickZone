from flask import jsonify, make_response

from app.models import Token


def create_registration_response(user):
    user_dto = user.user_dto()
    tokens = Token.generate_tokens(user_dto)
    Token.save_token(user, tokens.get('refresh_token'))

    response = make_response(jsonify(user_dto), 200)

    response.set_cookie(
        'refreshToken',
        tokens.get('refresh_token'),
        max_age=30 * 24 * 60 * 60,
        httponly=True)
    response.set_cookie(
        'accessToken',
        tokens.get('access_token'),
        max_age=30 * 60,
        httponly=True)

    return response


def process_validation_errors(e):
    error = {}

    for error_instance in e.errors():
        field = error_instance['loc'][0]
        message = error_instance['msg']

        if field == 'login':
            if 'at least 4 characters' in message:
                error = {
                    'message': 'Логин не должен быть короче 4 символов',
                    'field': 'login',
                }
            elif 'Логин занят' in message:
                return jsonify({
                    'message': 'Логин занят',
                    'field': 'login',
                }), 422

        elif field == 'password' and 'at least 4 characters' in message:
            error = {
                'message': 'Пароль не должен быть короче 4 символов',
                'field': 'password',
            }
    return jsonify(error=error), 400
