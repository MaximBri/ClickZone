import logging
import os

import redis
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import Config
from .errors import InsufficientMoneyError

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] #%(levelname)-8s %(filename)s:%(lineno)d - %(name)s - %(message)s'
)
logger = logging.getLogger(__name__)

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()
redis = redis.Redis(
    host=os.environ.get('REDIS_HOST'),
    decode_responses=True
)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from app.jwt_handlers import invalid_token_callback, expired_token_callback, check_if_token_in_blocklist, \
        revoked_token_callback, missing_token_callback

    cors.init_app(
        app,
        supports_credentials=True,
        origins=['https://clickzoneserver.ru',
                 'http://localhost:3000'],
        expose_headers=[
            'Authorization',
            'X-CSRFToken',
            'X-CSRF-TOKEN'
        ],
    )

    @app.errorhandler(InsufficientMoneyError)
    def handle_insufficient_funds(error):
        return jsonify({'msg': str(error)}), 402

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp, url_prefix='/api')

    from app.profile import bp as profile_bp
    app.register_blueprint(profile_bp, url_prefix='/api/profile')

    from app.daily_rewards import bp as daily_reward_bp
    app.register_blueprint(daily_reward_bp, url_prefix='/api/daily-rewards')

    from app.upgrades import bp as upgrades_bp
    app.register_blueprint(upgrades_bp, url_prefix='/api/upgrades')

    from app.containers import bp as containers_bp
    app.register_blueprint(containers_bp, url_prefix='/api/containers')

    return app


from app import models
