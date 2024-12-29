# coding: utf-8
from sqlalchemy import Column, Date, Integer, Numeric, Table, Unicode
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


t_VW_stock_mine = Table(
    'VW_stock_mine', metadata,
    Column('종목명', Unicode(14)),
    Column('종목코드', Unicode(6), nullable=False),
    Column('PER', Unicode(8)),
    Column('PBR', Unicode(5)),
    Column('배당수익률', Unicode(5))
)


t_VW_stock_mine_basics = Table(
    'VW_stock_mine_basics', metadata,
    Column('회사명', Unicode(30)),
    Column('종목코드', Unicode(6), nullable=False),
    Column('업종', Unicode),
    Column('주요제품', Unicode(100)),
    Column('상장일', Date),
    Column('결산월', Unicode(5)),
    Column('대표자명', Unicode),
    Column('홈페이지', Unicode),
    Column('지역', Unicode(10))
)


t_low_pbr_high_div = Table(
    'low_pbr_high_div', metadata,
    Column('종목코드', Unicode(6), nullable=False),
    Column('종목명', Unicode(15), nullable=False),
    Column('종가', Integer, nullable=False),
    Column('EPS', Integer),
    Column('PER', Numeric(7, 2)),
    Column('선행_EPS', Integer),
    Column('선행_PER', Numeric(9, 2)),
    Column('BPS', Integer),
    Column('PBR', Numeric(7, 2)),
    Column('주당배당금', Integer, nullable=False),
    Column('배당수익률', Numeric(5, 2), nullable=False)
)


class 유가증권상장사목록(Base):
    __tablename__ = '유가증권_상장사목록'

    회사명 = Column(Unicode(30), nullable=False)
    종목코드 = Column(Unicode(6), primary_key=True)
    업종 = Column(Unicode, nullable=False)
    주요제품 = Column(Unicode(100), nullable=False)
    상장일 = Column(Date, nullable=False)
    결산월 = Column(Unicode(5), nullable=False)
    대표자명 = Column(Unicode, nullable=False)
    홈페이지 = Column(Unicode)
    지역 = Column(Unicode(10), nullable=False)


class 코스닥상장사목록(Base):
    __tablename__ = '코스닥_상장사목록'

    회사명 = Column(Unicode(30), nullable=False)
    종목코드 = Column(Unicode(6), primary_key=True)
    업종 = Column(Unicode, nullable=False)
    주요제품 = Column(Unicode(100), nullable=False)
    상장일 = Column(Date, nullable=False)
    결산월 = Column(Unicode(5), nullable=False)
    대표자명 = Column(Unicode, nullable=False)
    홈페이지 = Column(Unicode)
    지역 = Column(Unicode(10), nullable=False)
