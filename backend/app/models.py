from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

from app import db


class User(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), unique=True, index=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    token: so.Mapped['Token'] = so.relationship(back_populates='user', uselist=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def user_dto(self):
        return {'user_id': self.id, 'username': self.username}

    def __repr__(self):
        return f'<User {self.username}>'


class Token(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)

    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey('user.id'), unique=True, index=True)
    refresh_token: so.Mapped[str] = so.mapped_column(sa.String())

    user: so.Mapped[User] = so.relationship(back_populates='token')

    @staticmethod
    def generate_tokens(user_dto):
        access_secret = current_app.config.get('JWT_ACCESS_SECRET')
        refresh_secret = current_app.config.get('JWT_REFRESH_SECRET')
        if not access_secret or not refresh_secret:
            raise ValueError("JWT secrets are not configured")

        access_token_payload = {**user_dto,
                                'exp': datetime.now(timezone.utc) + timedelta(minutes=30)}
        access_token = jwt.encode(
            access_token_payload,
            access_secret,
            algorithm='HS256'
        )

        refresh_token_payload = {**user_dto,
                                 'exp': datetime.now(timezone.utc) + timedelta(days=30)
                                 }
        refresh_token = jwt.encode(
            refresh_token_payload,
            refresh_secret,
            algorithm='HS256'
        )

        return {
            'access_token': access_token,
            'refresh_token': refresh_token
        }

    @staticmethod
    def save_token(user, refresh_token):
        token = Token.query.filter_by(user_id=user.id).first()
        if token:
            token.refresh_token = refresh_token
        else:
            token = Token(user=user, refresh_token=refresh_token)
            db.session.add(token)
        db.session.commit()


class DBSessionManager:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            db.session.commit()
        else:
            db.session.rollback()
