import sqlalchemy as sa
from pydantic import BaseModel, Field, model_validator, ConfigDict

from app import db
from app.models import Achievement


class IdAchievementForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        achievement_exists = db.session.query(sa.exists().where(Achievement.id == self.id)).scalar()
        if achievement_exists is None:
            raise ValueError('Достижения с таким id не существует')
        return self
