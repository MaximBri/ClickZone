from datetime import datetime, timezone
from typing import Optional

import sqlalchemy as sa
import sqlalchemy.orm as so
from sqlalchemy import event
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

from app import db


class Upgrade(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(sa.String(128), nullable=False, unique=True)
    description: so.Mapped[str] = so.mapped_column(sa.String(256), nullable=False)

    upgrade_type: so.Mapped[str] = so.mapped_column(sa.Enum('consumable', 'permanent', name='upgrade_type'))
    effect_type: so.Mapped[str] = so.mapped_column(sa.Enum('click', 'income', 'other', name='effect_type'))
    image_path: so.Mapped[str] = so.mapped_column(nullable=True)

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
    if upgrade.upgrade_type == 'permanent':
        existing = db.session.query(UserUpgrade).filter_by(
            user_id=target.user_id,
            upgrade_id=target.upgrade_id).first()
        if existing:
            raise ValueError('Permanent upgrade already exists')
        if target.quantity != 1:
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
    name: so.Mapped[str] = so.mapped_column(sa.String(64), nullable=False, unique=True, index=True)
    condition: so.Mapped[str] = so.mapped_column(sa.String(256), nullable=False)

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

    can_change_name: so.Mapped[bool] = so.mapped_column(default=True, nullable=False)
    about_me: so.Mapped[str] = so.mapped_column(sa.String(256), nullable=True)

    coins: so.Mapped[int] = so.mapped_column(default=0)
    diamonds: so.Mapped[int] = so.mapped_column(default=0)

    base_per_click: so.Mapped[int] = so.mapped_column(default=1)
    base_per_minute: so.Mapped[int] = so.mapped_column(default=0)
    last_update: so.Mapped[datetime] = so.mapped_column(default=lambda: datetime.now(timezone.utc))

    upgrades: so.DynamicMapped[UserUpgrade] = so.relationship(
        back_populates='user',
        lazy='dynamic',
        cascade='all, delete-orphan'
    )

    user_achievements: so.Mapped[list[UserAchievement]] = so.relationship(
        back_populates='user',
        cascade='all, delete-orphan'
    )

    @property
    def achievements(self) -> list[dict[str, str | bool]]:
        achievements = db.session.scalars(sa.select(Achievement))
        res = []
        for achievement in achievements:
            res.append({'name': achievement.name,
                        'condition': achievement.condition,
                        'has_achievement': achievement in self.user_achievements})
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
    def to_dict(cls) -> list[dict[str, str | int]]:
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
