from flask import Blueprint

bp = Blueprint('daily-rewards', __name__)

from app.daily_rewards import routes