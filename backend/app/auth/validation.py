import sqlalchemy as sa
from pydantic import BaseModel, Field, field_validator

from app import db
from app.models import User


class RegistrationForm(BaseModel):
    login: str = Field(..., min_length=4)
    password: str = Field(..., min_length=4)

    @field_validator('login')
    def validate_login(cls, value):
        user = db.session.scalar(
            sa.select(User).where(User.username == value)
        )
        if user is not None:
            raise ValueError('Логин занят')
        return value
