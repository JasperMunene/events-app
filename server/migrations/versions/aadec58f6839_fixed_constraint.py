"""fixed constraint

Revision ID: aadec58f6839
Revises: a2e837c82e69
Create Date: 2025-03-23 01:29:48.121312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aadec58f6839'
down_revision = 'a2e837c82e69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(length=9),
               type_=sa.String(length=20),
               nullable=False)

    with op.batch_alter_table('order_items', schema=None) as batch_op:
        batch_op.alter_column('subtotal',
               existing_type=sa.NUMERIC(precision=10, scale=2),
               type_=sa.Float(),
               existing_nullable=False)

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('total_amount',
               existing_type=sa.NUMERIC(precision=10, scale=2),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(length=8),
               type_=sa.String(length=20),
               nullable=False)

    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.alter_column('payment_method',
               existing_type=sa.VARCHAR(length=6),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('payment_status',
               existing_type=sa.VARCHAR(length=10),
               type_=sa.String(length=20),
               nullable=False)

    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.NUMERIC(precision=10, scale=2),
               type_=sa.Float(),
               existing_nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('user_type',
               existing_type=sa.VARCHAR(length=9),
               type_=sa.String(length=20),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('user_type',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=9),
               nullable=True)

    with op.batch_alter_table('tickets', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Float(),
               type_=sa.NUMERIC(precision=10, scale=2),
               existing_nullable=False)

    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.alter_column('payment_status',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=10),
               nullable=True)
        batch_op.alter_column('payment_method',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=6),
               existing_nullable=False)

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=8),
               nullable=True)
        batch_op.alter_column('total_amount',
               existing_type=sa.Float(),
               type_=sa.NUMERIC(precision=10, scale=2),
               existing_nullable=False)

    with op.batch_alter_table('order_items', schema=None) as batch_op:
        batch_op.alter_column('subtotal',
               existing_type=sa.Float(),
               type_=sa.NUMERIC(precision=10, scale=2),
               existing_nullable=False)

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=9),
               nullable=True)

    # ### end Alembic commands ###
