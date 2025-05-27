from datetime import datetime, timezone, timedelta
from typing import Optional
from random import randint

import sqlalchemy as sa
import sqlalchemy.orm as so
from sqlalchemy import event
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

from app import db


class Upgrade(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(128), unique=True)
    description: so.Mapped[str] = so.mapped_column(sa.String(256))

    upgrade_type: so.Mapped[str] = so.mapped_column(sa.Enum('consumable', 'permanent', name='upgrade_type'))
    effect_type: so.Mapped[str] = so.mapped_column(sa.Enum('click', 'income', 'other', name='effect_type'))
    image_path: so.Mapped[Optional[str]] = so.mapped_column(index=True)

    cost_coins: so.Mapped[int] = so.mapped_column(default=0)
    cost_diamonds: so.Mapped[int] = so.mapped_column(default=0)

    multiplier: so.Mapped[int] = so.mapped_column(default=1)

    user_upgrades: so.Mapped[list['UserUpgrade']] = so.relationship(
        back_populates='upgrade',
        cascade='all, delete-orphan'
    )

    @classmethod
    def to_dict(cls) -> list[dict[str, str | int]]:
        res: list[dict[str, str | int]] = []

        for upgrade in cls.query.filter(cls.name != 'nickname_change').order_by(cls.id).all():
            data = {'id': upgrade.id, 'name': upgrade.name, 'description': upgrade.description,
                    'upgrade_type': upgrade.upgrade_type, 'cost_coins': upgrade.cost_coins,
                    'cost_diamonds': upgrade.cost_diamonds, 'image_path': upgrade.image_path}
            res.append(data)

        return res

    def __repr__(self):
        return f'<Upgrade {self.name}>'


class UserUpgrade(db.Model):
    user_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey('user.id', name='fk_userupgrade_user'),
        primary_key=True
    )
    upgrade_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey('upgrade.id', name='fk_userupgrade_upgrade'),
        primary_key=True
    )

    quantity: so.Mapped[int] = so.mapped_column(default=1)
    active: so.Mapped[bool] = so.mapped_column(default=False)

    user: so.Mapped['User'] = so.relationship(back_populates='upgrades')
    upgrade: so.Mapped[Upgrade] = so.relationship(back_populates='user_upgrades')

    def __repr__(self):
        return f'<UserUpgrade {self.user.username}::{self.upgrade.name}>'


@event.listens_for(UserUpgrade, 'before_insert')
@event.listens_for(UserUpgrade, 'before_update')
def validate_user_upgrade(mapper, connection, target):
    upgrade = db.session.get(Upgrade, target.upgrade_id)
    if upgrade.upgrade_type == 'permanent' and target.quantity != 1:
        raise ValueError('Permanent upgrades can only have quantity 1')


class DBSessionManager:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            db.session.commit()
        else:
            db.session.rollback()


class Achievement(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(64), unique=True, index=True)
    condition: so.Mapped[str] = so.mapped_column(sa.String(256))

    user_achievements: so.Mapped[list['UserAchievement']] = so.relationship(
        back_populates='achievement',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f'<Achievement {self.name}>'


class UserAchievement(db.Model):
    user_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey('user.id', name='fk_userachievement_user'),
        primary_key=True
    )
    achievement_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey('achievement.id', name='fk_userachievement_achievement'),
        primary_key=True
    )
    user: so.Mapped['User'] = so.relationship(back_populates='user_achievements')
    achievement: so.Mapped[Achievement] = so.relationship(back_populates='user_achievements')

    def __repr__(self):
        return f'<UserAchievement {self.user.username}::{self.achievement.name}>'


class User(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(64))
    username: so.Mapped[str] = so.mapped_column(sa.String(64), unique=True, index=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    can_change_name: so.Mapped[bool] = so.mapped_column(default=True)
    changes_number: so.Mapped[int] = so.mapped_column(default=0)
    about_me: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))

    coins: so.Mapped[int] = so.mapped_column(default=0)
    diamonds: so.Mapped[int] = so.mapped_column(default=0)
    keys: so.Mapped[int] = so.mapped_column(default=0)

    base_per_click: so.Mapped[int] = so.mapped_column(default=1)
    base_per_minute: so.Mapped[int] = so.mapped_column(default=0)
    last_update: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(timezone.utc))

    current_reward_day: so.Mapped[int] = so.mapped_column(default=1)
    last_reward_claimed_at: so.Mapped[Optional[datetime]] = so.mapped_column(sa.DateTime(timezone=True))

    upgrades: so.DynamicMapped[UserUpgrade] = so.relationship(
        back_populates='user',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    user_achievements: so.Mapped[list[UserAchievement]] = so.relationship(
        back_populates='user',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    containers: so.Mapped[list['UserContainer']] = so.relationship(
        back_populates='user',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    @property
    def achievements(self) -> list[dict[str, str | bool]]:
        achievements = db.session.scalars(sa.select(Achievement)).all()
        res = []
        for achievement in achievements:
            res.append({'name': achievement.name,
                        'condition': achievement.condition,
                        'has_achievement': achievement in [ua.achievement for ua in self.user_achievements.all()]})
        return res

    @property
    def nickname_change_cost(self) -> dict[str, int]:
        if self.can_change_name:
            return {'coins': 0,
                    'diamonds': 0}
        upgrade = Upgrade.query.filter_by(name='nickname_change').first()
        return {'coins': upgrade.cost_coins,
                'diamonds': upgrade.cost_diamonds}

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def user_dto(self) -> dict[str, int | str]:
        return {'user_id': self.id, 'username': self.username}

    def is_streak_broken(self) -> bool:
        if not self.last_reward_claimed_at:
            return False
        time_since_last = datetime.now(timezone.utc) - self.last_reward_claimed_at
        return time_since_last >= timedelta(minutes=4)  # timedelta(hours=48)

    def can_claim_reward(self) -> bool:
        if not self.last_reward_claimed_at:
            return True
        time_since_last = datetime.now(timezone.utc) - self.last_reward_claimed_at
        return time_since_last >= timedelta(minutes=2)  # timedelta(hours=24)

    def get_next_reward_info(self) -> dict:
        now = datetime.now(timezone.utc)

        # 1) Проверяем, не сломана ли цепочка (нет награды больше 48 часов подряд)
        if self.is_streak_broken():
            return {
                "current_day": 1,
                "available": True,
                "time_to_next": {"hours": 0, "minutes": 0, "seconds": 0}
            }

        # 2) Если цепочка не сломана, смотрим, когда была последняя выдача
        if not self.last_reward_claimed_at:
            # Первый раз — награда сразу доступна
            return {
                "current_day": self.current_reward_day,
                "available": True,
                "time_to_next": {"hours": 0, "minutes": 0, "seconds": 0}
            }

        # 3) Сколько прошло с последнего получения
        elapsed: timedelta = now - self.last_reward_claimed_at
        # 4) Сколько нужно ждать для следующей (24 часа)
        wait_period = timedelta(minutes=2)  # timedelta(hours=24)

        if elapsed >= wait_period:
            # Уже прошло достаточно времени — можно брать сейчас
            return {
                "current_day": self.current_reward_day,
                "available": True,
                "time_to_next": {"hours": 0, "minutes": 0, "seconds": 0}
            }
        else:
            # Ещё надо подождать
            remaining: timedelta = wait_period - elapsed
            # Извлекаем часы, минуты и секунды из оставшегося timedelta
            total_seconds = int(remaining.total_seconds())
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            seconds = total_seconds % 60

            return {
                "current_day": self.current_reward_day,
                "available": False,
                "time_to_next": {
                    "hours": hours,
                    "minutes": minutes,
                    "seconds": seconds
                }
            }

    def __repr__(self):
        return f'<User {self.username}>'


@event.listens_for(User, 'before_insert')
def create_unique_name(mapper, connection, target):
    max_id = db.session.scalar(sa.func.max(User.id))
    if max_id is not None:
        target.name = f'User_{max_id + 1}'
    else:
        target.name = 'User_0'


class DailyReward(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    coins: so.Mapped[int] = so.mapped_column(nullable=True)
    diamonds: so.Mapped[int] = so.mapped_column(nullable=True)
    custom: so.Mapped[str] = so.mapped_column(nullable=True)

    @classmethod
    def to_dict_all(cls) -> list[dict[str, str | int]]:
        res: list[dict[str, str | int]] = []

        rewards = cls.query.order_by(cls.id).all()
        for reward in rewards:
            data = {}
            if reward.coins is not None:
                data['coins'] = reward.coins
            if reward.diamonds is not None:
                data['diamonds'] = reward.diamonds
            if reward.custom is not None:
                data['custom'] = reward.custom
            res.append({'id': reward.id, 'rewards': data})
        return res

    def to_dict_self(self):
        data = {'id': self.id}
        if self.coins is not None:
            data['coins'] = self.coins
        if self.diamonds is not None:
            data['diamonds'] = self.diamonds
        if self.custom is not None:
            data['custom'] = self.custom
        return data

    def __repr__(self):
        return f'<DailyReward: {self.id}>'


class Container(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(unique=True)
    image_path: so.Mapped[str] = so.mapped_column(index=True)
    cost_coins: so.Mapped[int] = so.mapped_column(default=0)
    cost_diamonds: so.Mapped[int] = so.mapped_column(default=0)

    rewards: so.Mapped[list['ContainerReward']] = so.relationship(
        back_populates='container', foreign_keys='[ContainerReward.container_id]',
        cascade='all, delete-orphan')

    user_containers: so.Mapped[list['UserContainer']] = so.relationship(
        back_populates='container',
        cascade='all, delete-orphan')

    @classmethod
    def to_dict_all(cls) -> list[dict]:
        res = []

        for container in cls.query.all():
            res.append(container.to_dict_self())
        return res

    def to_dict_self(self) -> dict[str, str | int | dict[str, int]]:
        rewards = []
        for reward in self.rewards:
            reward_data = {}
            if reward.coins is not None:
                reward_data['coins'] = reward.coins
            elif reward.diamonds is not None:
                reward_data['diamonds'] = reward.diamonds
            elif reward.keys is not None:
                reward_data['keys'] = reward.keys
            elif reward.improvement_id:
                reward_data['improvement_id'] = reward.improvement_id
                reward_data['count'] = reward.count
                reward_data['imagePath'] = reward.image_path
            elif reward.awarded_container_id:
                reward_data['container_id'] = reward.awarded_container_id
                reward_data['count'] = reward.count
                reward_data['imagePath'] = reward.image_path
            rewards.append(reward_data)
        res = {
            'id': self.id,
            'name': self.name,
            'imagePath': self.image_path,
            'price': {'coins': self.cost_coins, 'diamonds': self.cost_diamonds},
            'rewards': rewards
        }

        return res

    def get_reward(self, use_key: bool) -> dict[str, str | int]:
        reward_data = {}
        rand = randint(0 if not use_key else 6, len(self.rewards) - 1)
        reward = self.rewards[rand]
        if reward.coins is not None:
            reward_data['coins'] = reward.coins
        elif reward.diamonds is not None:
            reward_data['diamonds'] = reward.diamonds
        elif reward.keys is not None:
            reward_data['keys'] = reward.keys
        elif reward.improvement_id:
            reward_data['improvement_id'] = reward.improvement_id
            reward_data['count'] = reward.count
        elif reward.awarded_container_id:
            reward_data['container_id'] = reward.awarded_container_id
            reward_data['count'] = reward.count

        return reward_data

    def __repr__(self):
        return f'<Container: {self.name}>'


class ContainerReward(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    container_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey('container.id', name='fk_containerreward_container'))

    coins: so.Mapped[Optional[int]] = so.mapped_column()
    diamonds: so.Mapped[Optional[int]] = so.mapped_column()
    keys: so.Mapped[Optional[int]] = so.mapped_column()
    improvement_id: so.Mapped[Optional[int]] = so.mapped_column(
        sa.ForeignKey('upgrade.id'), name='fk_upgrade_container')
    awarded_container_id: so.Mapped[Optional[int]] = so.mapped_column(
        sa.ForeignKey('container.id'), name='fk_awardedcontainer_container')
    count: so.Mapped[int] = so.mapped_column(default=1)
    image_path: so.Mapped[str] = so.mapped_column()

    container: so.Mapped[Container] = so.relationship(back_populates='rewards', foreign_keys=[container_id])
    improvement: so.Mapped[Optional[Upgrade]] = so.relationship()
    awarded_container: so.Mapped[Optional[Container]] = so.relationship(foreign_keys=[awarded_container_id])

    def __repr__(self):
        return f'<ContainerReward {self.id} for container {self.container_id}>'


class UserContainer(db.Model):
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey('user.id', name='fk_usercontainer_user'),
                                               primary_key=True)
    container_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey('container.id', name='fk_usercontainer_container'),
                                                    primary_key=True)

    quantity: so.Mapped[int] = so.mapped_column(default=1)

    container: so.Mapped[Container] = so.relationship(back_populates='user_containers')
    user: so.Mapped[User] = so.relationship(back_populates='containers')

    def __repr__(self):
        return f'<UserContainer {self.user_id}::{self.container_id}>'
