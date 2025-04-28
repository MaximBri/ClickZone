from pydantic import BaseModel, Field, model_validator, ConfigDict


class ResourceForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    coins: int = Field(...)
    diamonds: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        if self.coins >= 0 and self.diamonds >= 0:
            return self

        elif self.coins < 0 and self.diamonds < 0:
            raise ValueError(
                'Монеты и алмазы пользователя не могут быть меньше 0'
            )
        else:
            if self.coins >= 0:
                raise ValueError(
                    'Алмазы пользователя не могут быть меньше 0'
                )
            raise ValueError(
                'Монеты пользователя не могут быть меньше 0'
            )
