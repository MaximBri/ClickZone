import sqlalchemy as sa
from pydantic import BaseModel, Field, model_validator, ConfigDict
from flask_jwt_extended import get_current_user

from app import db
from app.models import Container, ContainerReward, UserContainer


class IdContainerForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)
    use_key: bool = Field(...)

    @model_validator(mode='after')
    def validate(self):
        container_exists = db.session.query(sa.exists().where(Container.id == self.id)).scalar()
        if not container_exists:
            raise ValueError('Контейнер с таким id не существует')

        user = get_current_user()
        user_has_container = user.containers.filter(
            UserContainer.container_id == self.id
        ).first() is not None
        if not user_has_container:
            raise ValueError('У пользователя нет такого контейнера')
        return self
