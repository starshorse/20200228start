"""empty message

Revision ID: 76b9786cd03f
Revises: d885ca431430
Create Date: 2024-06-15 20:42:15.469714

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '76b9786cd03f'
down_revision: Union[str, None] = 'd885ca431430'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
