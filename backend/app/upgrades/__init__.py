from flask import Blueprint

bp = Blueprint('upgrades', __name__)

from app.upgrades import routes