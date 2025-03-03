import sqlalchemy as sa
from pydantic import BaseModel, Field, field_validator, ConfigDict

from app import db
from app.models import User


class EditProfileForm(BaseModel):
    model_config = ConfigDict(extra='forbid')
    name: str = Field(..., min_length=1)
    about_me: str = Field(..., min_length=1)

    @field_validator('name')
    def validate_name(cls, value):
        user = db.session.scalar(
            sa.select(User).where(User.name == value)
        )
        if user is not None:
            raise ValueError('Имя занято')
        return value
