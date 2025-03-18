import os
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.dirname(__file__))


class Config:
    load_dotenv(os.path.join(base_dir, '.env'))

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key-1234'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(base_dir, 'ClickZone.db')
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', None)

    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-secret-clickzone'
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_TOKEN_EXPIRES = 30 * 60
    JWT_REFRESH_TOKEN_EXPIRES = 30 * 24 * 60 * 60
    JWT_COOKIE_SECURE = True  # HTTPS only
    JWT_COOKIE_HTTPONLY = True
    JWT_COOKIE_SAMESITE = 'Lax'  # CSRF protection

    JWT_CSRF_IN_COOKIES = True
    JWT_COOKIE_CSRF_PROTECT = True  # Включаем CSRF-защиту для JWT cookies

    FLASK_APP = os.environ.get('FLASK_APP')
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')
