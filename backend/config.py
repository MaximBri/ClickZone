import os
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.dirname(__file__))


class Config:
    load_dotenv(os.path.join(base_dir, '.env'))

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key-1234'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(base_dir, 'ClickZone.db')
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS') or 'http://localhost:3000'
    JWT_REFRESH_SECRET = os.environ.get('JWT_REFRESH_SECRET')
    JWT_ACCESS_SECRET = os.environ.get('JWT_ACCESS_SECRET')
