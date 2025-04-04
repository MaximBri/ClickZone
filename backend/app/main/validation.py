import sqlalchemy as sa
from pydantic import BaseModel, Field, model_validator, ConfigDict

from app import db
from app.models import Upgrade


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
