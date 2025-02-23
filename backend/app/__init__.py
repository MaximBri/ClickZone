from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from config import Config

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    cors.init_app(app)
    cors.origin = app.config['CORS_ORIGINS']

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    return app


from app import models
