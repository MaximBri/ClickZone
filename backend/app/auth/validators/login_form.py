from pydantic import BaseModel, Field, ConfigDict, model_validator

from app.models import User


class LoginForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    login: str = Field(..., min_length=4)
    password: str = Field(..., min_length=4)

    @model_validator(mode='after')
    def validate(self):
        user: User = User.query.filter_by(username=self.login).first()
        if not user or not user.check_password(self.password):
            raise ValueError('Invalid login or password')
        return self