import logging

from flask import jsonify

logger = logging.getLogger(__name__)

def validation_error(e: Exception):
    errors = []

    for error in e.errors():
        field = error.get('loc', [""])
        if field:
            field = field[0]
        else:
            field = ''
        message = error.get('msg', 'Validation error')

        if field == 'login':
            if 'at least 4 characters' in message:
                errors.append({
                    'msg': 'Login must be at least 4 characters',
                    'field': 'login',
                })
            elif 'Логин занят' in message:
                return jsonify({'errors': [{'msg': 'Login is busy', 'field': 'login'}]}), 422

        elif field == 'password' and 'at least 4 characters' in message:
            errors.append({
                'msg': 'Password must be at least 4 characters',
                'field': 'password',
            })
        elif field == 'name' and 'занято' in message:
            return jsonify({'errors': [{'msg': 'Name is busy', 'field': 'name'}]}), 412
        else:
            # Fallback for unknown errors
            errors.append({
                'msg': message,
                'field': field,
            })
    return jsonify(errors=errors), 400


def default_error(e):
    logger.error(f'Unexpected server error: {e}', exc_info=True)
    return jsonify({'errors': [{'msg': f'Произошла ошибка: {e}'}]}), 500
