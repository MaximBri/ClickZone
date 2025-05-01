from pydantic import BaseModel, Field, model_validator, ConfigDict

from app.models import Container


class ContainerForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)
    cost_coins: int = Field(...)
    cost_diamonds: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        container = Container.query.filter_by(id=self.id).first()
        if container is not None:
            if self.cost_coins == 0 and self.cost_diamonds == 0:
                raise ValueError('Только 1 параметр может быть равен нулю')
            elif self.cost_coins == 0 or self.cost_diamonds == 0:
                if self.cost_coins == 0:
                    if container.cost_diamonds == self.cost_diamonds:
                        return self
                    raise ValueError('Параметр cost_diamonds не соответствует реальной цене контейнера в алмазах')
                if self.cost_diamonds == 0:
                    if container.cost_coins == self.cost_coins:
                        return self
                    raise ValueError('Параметр cost_coins не соответствует реальной цене контейнера в монетах')
            raise ValueError(
                'Для покупки контейнера требуется либо cost_coins, либо cost_coins. Второй параметр занулить')
        raise ValueError('Контейнер не найден')
