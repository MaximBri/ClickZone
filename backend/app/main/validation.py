import sqlalchemy as sa
from pydantic import BaseModel, Field, model_validator, ConfigDict

from app import db
from app.models import Upgrade, Container


class UpgradeForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)
    cost_coins: int = Field(...)
    cost_diamonds: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        upgrade = Upgrade.query.filter_by(id=self.id).first()
        if upgrade is not None:
            if upgrade.cost_coins == self.cost_coins and \
                    upgrade.cost_diamonds == self.cost_diamonds:
                return self
            raise ValueError('Цена улучшения не соответствует его реальной цене')
        raise ValueError('Улучшение не найдено')


class ContainerForm(BaseModel):
    model_config = ConfigDict(extra='forbid')

    id: int = Field(...)
    price_coins: int = Field(...)
    price_diamonds: int = Field(...)

    @model_validator(mode='after')
    def validate(self):
        container = Container.query.filter_by(id=self.id).first()
        if container is not None:
            if self.price_coins == 0 and self.price_diamonds == 0:
                raise ValueError('Только 1 параметр может быть равен нулю')
            elif self.price_coins == 0 or self.price_diamonds == 0:
                if self.price_coins == 0:
                    if container.price_diamonds == self.price_diamonds:
                        return self
                    raise ValueError('Параметр price_diamonds не соответствует реальной цене контейнера в алмазах')
                if self.price_diamonds == 0:
                    if container.price_coins == self.price_coins:
                        return self
                    raise ValueError('Параметр price_coins не соответствует реальной цене контейнера в монетах')
            raise ValueError(
                'Для покупки контейнера требуется либо price_coins, либо price_diamonds. Второй параметр занулить')
        raise ValueError('Контейнер не найден')
