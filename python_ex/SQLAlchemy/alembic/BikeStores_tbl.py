from sqlalchemy import Column, Identity, Index, Integer, PrimaryKeyConstraint, Unicode
from sqlalchemy.dialects.mssql import DATETIMEOFFSET
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped

Base = declarative_base()


class SequelizeMeta(Base):
    __tablename__ = 'SequelizeMeta'
    __table_args__ = (
        PrimaryKeyConstraint('name', name='PK__Sequeliz__72E12F1ABE32F6FD'),
        Index('UQ__Sequeliz__72E12F1BD487AA03', 'name', unique=True)
    )

    name = mapped_column(Unicode(255))


class Users(Base):
    __tablename__ = 'Users'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='PK__Users__3213E83F9AB10B4E'),
    )

    id = mapped_column(Integer, Identity(start=1, increment=1))
    createdAt = mapped_column(DATETIMEOFFSET, nullable=False)
    updatedAt = mapped_column(DATETIMEOFFSET, nullable=False)
    name = mapped_column(Unicode(255))
    email = mapped_column(Unicode(255))
