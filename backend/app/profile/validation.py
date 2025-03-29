import sqlalchemy as sa
from flask_jwt_extended import get_current_user
from pydantic import BaseModel, Field, field_validator, ConfigDict

from app import db
from app.models import User


class EditProfileForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    name: str = Field(..., min_length=1)
    about_me: str = Field(...)
    nickname_price: dict[str, int] = Field()

    @field_validator('name')
    def validate_name(cls, value):
        user = db.session.scalar(
            sa.select(User).where(User.name == value)
        )
        if user is not None:
            if not user.id == get_current_user().id:
                raise ValueError('Имя занято')
        return value

    @field_validator('nickname_price')
    def validate_nickname_price(cls, value: dict[str, int]):
        nickname_price = db.session.scalar(sa.select(User)).nickname_change_cost
        if nickname_price == value:
            return value
        raise ValueError('Цена сфальсифицирована')

