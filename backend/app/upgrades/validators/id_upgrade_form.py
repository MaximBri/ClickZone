import sqlalchemy as sa
from pydantic import BaseModel, Field, model_validator, ConfigDict
from flask_jwt_extended import get_current_user

from app import db
from app.models import Upgrade, UserUpgrade


class IdUpgradeForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        upgrade_exists = db.session.query(sa.exists().where(Upgrade.id == self.id)).scalar()
        if not upgrade_exists:
            raise ValueError('Улучшения с таким id не существует')

        user = get_current_user()
        user_has_upgrade = user.upgrades.filter(
            UserUpgrade.upgrade_id == self.id
        ).first() is not None
        if not user_has_upgrade:
            raise ValueError('У пользователя нет такого улучшения')
        return self
