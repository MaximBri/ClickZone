from flask import Blueprint

bp = Blueprint('profile', __name__, template_folder='templates')

from app.profile import routes