"""Added Achievement and UserAchievement(many-to-many) models

Revision ID: 65c786d8b8e2
Revises: a84a45b88592
Create Date: 2025-03-29 14:13:06.567864

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '65c786d8b8e2'
down_revision = 'a84a45b88592'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('achievement',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=64), nullable=False),
                    sa.Column('condition', sa.String(length=256), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    with op.batch_alter_table('achievement', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_achievement_name'), ['name'], unique=True)

    op.create_table('user_achievement',
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('achievement_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['achievement_id'], ['achievement.id'],
                                            name='fk_userachievement_achievement'),
                    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='fk_userachievement_user'),
                    sa.PrimaryKeyConstraint('user_id', 'achievement_id')
                    )

    achievements = {'Новичок': 'накопить первую тысячу монет',
                    'Миллионер': 'накопить миллион монет',
                    'Магнат': 'накопить миллиард монет',
                    'Легионер': '30 дней с момента регистрации',
                    'Счастливчик': 'получить редкий предмет из сундука',
                    'Торговец': 'продать 5 товаров на рынке',
                    'Бизнесмен': 'продать 20 товаров на рынке',
                    'Популярность': 'сменить никнейм 3 раза',
                    'Моя территория': 'захватить источник на глобальной карте',
                    'Полководец': 'иметь армию из 1000 войнов',
                    'Первооткрыватель': 'входить в число первых 10 зарегистрировавшихся игроков'
                    }
    from app.models import Achievement
    from sqlalchemy.orm import Session

    bind = op.get_bind()
    session = Session(bind=bind)

    for key, value in achievements.items():
        session.add(Achievement(name=key, condition=value))
    session.commit()

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_achievement')
    with op.batch_alter_table('achievement', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_achievement_name'))

    op.drop_table('achievement')
    # ### end Alembic commands ###
