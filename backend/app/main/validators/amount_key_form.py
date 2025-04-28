from pydantic import BaseModel, Field, model_validator, ConfigDict
from flask_jwt_extended import get_current_user

from config import Config


class AmountKeyForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    amount: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        user = get_current_user()

        if user.coins >= self.amount * Config.KEYS_PRICE:
            return self
        raise ValueError(f'У пользователя недостаточно монет для покупки {self.amount} ключа(ей)')
