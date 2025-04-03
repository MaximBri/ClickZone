"""Added can_change_name field for free updating Nickname

Revision ID: a84a45b88592
Revises: 49cfe7b05432
Create Date: 2025-03-29 12:51:27.464084

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a84a45b88592'
down_revision = '49cfe7b05432'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('can_change_name', sa.Boolean(), nullable=False))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('can_change_name')

    # ### end Alembic commands ###
