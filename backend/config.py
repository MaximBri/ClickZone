import os
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.dirname(__file__))


class Config:
    KEYS_PRICE = 1000
    load_dotenv(os.path.join(base_dir, '.env'))

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key-1234'

    DB_HOST = os.environ.get('DB_HOST')
    DB_PORT = os.environ.get('DB_PORT')
    DB_USER = os.environ.get('DB_USER')
    DB_PASS = os.environ.get('DB_PASS')
    DB_NAME = os.environ.get('DB_NAME')

    if DB_HOST is not None and DB_PORT is not None and DB_USER is not None and DB_PASS is not None and DB_NAME is not None:
        SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    else:
        SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(base_dir, 'ClickZone.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-secret-clickzone'
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_TOKEN_EXPIRES = 30 * 60
    JWT_REFRESH_TOKEN_EXPIRES = 30 * 24 * 60 * 60
    JWT_COOKIE_SECURE = True  # HTTPS only
    JWT_COOKIE_HTTPONLY = True

    JWT_CSRF_IN_COOKIES = True
    JWT_COOKIE_CSRF_PROTECT = True  # Включаем CSRF-защиту для JWT cookies

    # Localhost
    JWT_COOKIE_SAMESITE = 'Lax'  # CSRF protection/
    JWT_COOKIE_DOMAIN = None
    FLASK_DEBUG = True

    # Production
    # JWT_COOKIE_SAMESITE = 'None'  # CSRF protection
    # JWT_COOKIE_DOMAIN = '.clickzoneserver.ru'
    # FLASK_DEBUG = False

    FLASK_APP = os.environ.get('FLASK_APP')
