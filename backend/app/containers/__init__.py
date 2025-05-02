from flask import Blueprint

bp = Blueprint('containers', __name__)

from app.containers import routes