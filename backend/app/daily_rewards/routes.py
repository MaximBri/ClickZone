from datetime import datetime, timezone

from flask_jwt_extended import jwt_required, get_current_user
from flask import make_response, jsonify
from pydantic import ValidationError

from app.daily_rewards import bp
from app import db
from app.models import User, DailyReward, Upgrade, DBSessionManager, UserUpgrade, Container, UserContainer
from app.errors import default_error


@bp.route('/', methods=['GET'])
@jwt_required()
def daily_rewards():
    return make_response(DailyReward.to_dict_all(), 200)


@bp.route('/status', methods=['GET'])
@jwt_required()
def daily_rewards_status():
    user = get_current_user()
    reward_info = user.get_next_reward_info()
    return make_response(reward_info, 200)


@bp.route('/claim', methods=['POST'])
@jwt_required()
def daily_rewards_claim():
    try:
        with DBSessionManager():
            user = get_current_user()
            reward = DailyReward.query.get(user.current_reward_day)

            if not reward:
                return jsonify({'errors': [{'msg': 'Reward not found'}]}, 404)
            if user.is_streak_broken():
                user.current_reward_day = 1
            if not user.can_claim_reward():
                return jsonify({'errors': [{'msg': 'Reward not available'}]}, 400)

            user.coins += reward.coins or 0
            user.diamonds += reward.diamonds or 0
            if reward.custom is not None:
                if '/miglioramenti/' in reward.custom:
                    upgrade_path = reward.custom.split('/')[-1]
                    upgrade = Upgrade.query.filter_by(image_path=upgrade_path).scalar()
                    if (existing_upgrade := UserUpgrade.query.filter_by(upgrade_id=upgrade.id).first()) is not None:
                        existing_upgrade.quantity += 1
                    else:
                        new_user_custom = UserUpgrade(user=user, upgrade=upgrade)
                        db.session.add(new_user_custom)
                else:
                    container_path = reward.custom.split('/')[-1]
                    container = Container.query.filter_by(image_path=container_path).scalar()
                    if (existing_container := UserContainer.query.filter_by(container_id=container.id).first()
                    ) is not None:
                        existing_container.quantity += 1
                    else:
                        new_user_custom = UserContainer(user=user, container=container)
                        db.session.add(new_user_custom)

            user.current_reward_day = user.current_reward_day % 14 + 1
            user.last_reward_claimed_at = datetime.now(timezone.utc)

        response = make_response(
            {'reward_id': reward.id, 'user_resources': {'coins': user.coins, 'diamonds': user.diamonds}}, 200)
        return response

    except Exception as e:
        return default_error(e)
