# coding: utf-8
from sqlalchemy import Column, Date, Integer, Numeric, Table, Unicode
#from sqlalchemy.ext.declarative import declarative_base
from hermes_DB.database import db 
Base = db.Model 

#Base = declarative_base()
metadata = Base.metadata


class Mine(Base):
    __tablename__ = 'mine'

    종목코드 = Column(Unicode(6), primary_key=True)


t_pykrx_time = Table(
    'pykrx_time', metadata,
    Column('일자', Date, nullable=False),
    Column('종목코드', Unicode(6), nullable=False),
    Column('종목명', Unicode(14), nullable=False),
    Column('관리여부', Unicode(4)),
    Column('PER', Unicode(8)),
    Column('PBR', Unicode(5)),
    Column('배당수익률', Unicode(5))
)


class Stable(Base):
    __tablename__ = 'stables'

    일자 = Column(Date, nullable=False)
    종목코드 = Column(Unicode(6), primary_key=True)
    종목명 = Column(Unicode(14), nullable=False)
    관리여부 = Column(Unicode(4), nullable=False)
    종가 = Column(Unicode(9), nullable=False)
    EPS = Column(Unicode(7), nullable=False)
    PER = Column(Unicode(8), nullable=False)
    BPS = Column(Unicode(9), nullable=False)
    PBR = Column(Unicode(5), nullable=False)
    주당배당금 = Column(Unicode(6))
    배당수익률 = Column(Unicode(5))


class StablesNw(Base):
    __tablename__ = 'stables_nw'

    종목코드 = Column(Unicode(6), primary_key=True)
    종목명 = Column(Unicode(15), nullable=False)
    종가 = Column(Integer, nullable=False)
    대비 = Column(Integer, nullable=False)
    등락률 = Column(Numeric(6, 2), nullable=False)
    EPS = Column(Integer)
    PER = Column(Numeric(7, 2))
    선행_EPS = Column(Integer)
    선행_PER = Column(Numeric(9, 2))
    BPS = Column(Integer)
    PBR = Column(Numeric(7, 2))
    주당배당금 = Column(Integer, nullable=False)
    배당수익률 = Column(Numeric(5, 2), nullable=False)


