"""empty message

Revision ID: c11200182211
Revises: 
Create Date: 2024-07-15 15:53:14.142765

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c11200182211'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    tbl_obj = op.create_table(
        "TB_bk_기관코드",
        sa.Column('seq',sa.Integer, nullable=False ),
        sa.Column('기관코드',sa.String(20), unique=True ),
        sa.Column('계좌명칭', sa.String(20), unique=True ),
        sa.PrimaryKeyConstraint('seq') 
    );
    op.bulk_insert(
            tbl_obj ,
            [{
                "기관코드":"0004",
                "계좌명칭":"국민은행"
                }]
            )

def downgrade():
    op.drop_table("TB_bk_기관코드")  
