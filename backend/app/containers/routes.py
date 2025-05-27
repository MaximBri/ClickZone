from flask_jwt_extended import jwt_required, get_current_user
from flask import request, make_response
from pydantic import ValidationError

from app import db
from app.containers import bp
from app.errors import validation_error, default_error
from app.models import Upgrade, DBSessionManager, UserUpgrade, Container, UserContainer
from .validators import ContainerForm, IdContainerForm


@bp.route('/', methods=['GET', 'POST'])
@jwt_required()
def containers():
    if request.method == 'GET':
        response = make_response(Container.to_dict_all(), 200)
        return response
    try:
        with DBSessionManager():
            form = ContainerForm(**request.get_json())
            container = Container.query.get(form.id)
            user = get_current_user()

            if user.coins < form.cost_coins or user.diamonds < form.cost_diamonds:
                return jsonify({'errors': [{'msg': 'Not enough coins or diamonds'}]})

            user.coins -= form.cost_coins
            user.diamonds -= form.cost_diamonds

            user_container = user.containers.filter_by(container_id=container.id).first()
            if user_container:
                user_container.quantity += 1
            else:
                user_container = UserContainer(user=user, container=container)
                db.session.add(user_container)

        response = make_response({'user_coins': user.coins, 'user_diamonds': user.diamonds}, 200)
        return response

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)


@bp.route('/claim', methods=['POST'])
@jwt_required()
def containers_claim():
    try:
        with DBSessionManager():
            form = IdContainerForm(**request.get_json())
            user = get_current_user()
            user_container: UserContainer = user.containers.filter_by(container_id=form.id).first()
            container_rewards: dict[str, str | int] = user_container.container.get_reward(use_key=form.use_key)

            if (coins := container_rewards.get('coins')) is not None:
                user.coins += coins
            if (diamonds := container_rewards.get('diamonds')) is not None:
                user.diamonds += diamonds
            if (keys_ := container_rewards.get('keys')) is not None:
                user.keys += keys_
            if (id := container_rewards.get('improvement_id')) is not None:
                upgrade: Upgrade = Upgrade.query.get(id)
                count = container_rewards.get('count')
                if upgrade.upgrade_type == 'permanent':
                    existing = db.session.query(UserUpgrade).filter_by(upgrade_id=id, user_id=user.id).first()
                    if existing:
                        return jsonify({'errors': [{'msg': 'Upgrade already purchased'}]}, 400)
                    user_upgrade = UserUpgrade(user=user, upgrade=upgrade, quantity=1)
                else:
                    user_upgrade = user.upgrades.filter_by(upgrade_id=id).first()
                    if user_upgrade:
                        user_upgrade.quantity += count
                    else:
                        user_upgrade = UserUpgrade(user=user, upgrade=upgrade, quantity=count)
                db.session.add(user_upgrade)
            if (id := container_rewards.get('container_id')) is not None:
                container: Container = Container.query.get(id)
                count = container_rewards.get('count')

                user_container_ = user.containers.filter_by(container_id=id).first()
                if user_container_:
                    user_container_.quantity += count
                else:
                    user_container_ = UserContainer(user=user, container=container, quantity=count)
                db.session.add(user_container_)

            if user_container.quantity > 1:
                user_container.quantity -= 1
            else:
                db.session.delete(user_container)
            if form.use_key:
                user.keys -= 1
            return make_response({'msg': f'Приз получен!', 'reward': container_rewards}, 200)

    except ValidationError as e:
        return validation_error(e)
    except Exception as e:
        return default_error(e)
