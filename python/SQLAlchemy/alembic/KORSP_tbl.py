from sqlalchemy import BigInteger, Column, Date, Integer, Numeric, PrimaryKeyConstraint, Table, Unicode
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped

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


class Mine(Base):
    __tablename__ = 'mine'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__mine__0E2DA8CA8A670F1F'),
    )

    종목코드 = mapped_column(Unicode(6))


t_naver_stock_stable = Table(
    'naver_stock_stable', metadata,
    Column('seq', BigInteger),
    Column('일자', Date, nullable=False),
    Column('종목코드', Unicode(6), nullable=False),
    Column('종목명', Unicode(14)),
    Column('관리여부', Unicode(4)),
    Column('PER', Unicode(8)),
    Column('PBR', Unicode(5)),
    Column('배당수익률', Unicode(5))
)


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


class Stables(Base):
    __tablename__ = 'stables'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__stables__0E2DA8CA7CFFFCB7'),
    )

    일자 = mapped_column(Date, nullable=False)
    종목코드 = mapped_column(Unicode(6))
    종목명 = mapped_column(Unicode(14), nullable=False)
    관리여부 = mapped_column(Unicode(4), nullable=False)
    종가 = mapped_column(Unicode(9), nullable=False)
    EPS = mapped_column(Unicode(7), nullable=False)
    PER = mapped_column(Unicode(8), nullable=False)
    BPS = mapped_column(Unicode(9), nullable=False)
    PBR = mapped_column(Unicode(5), nullable=False)
    주당배당금 = mapped_column(Unicode(6))
    배당수익률 = mapped_column(Unicode(5))


class StablesNw(Base):
    __tablename__ = 'stables_nw'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__stables___0E2DA8CA21BA73DE'),
    )

    종목코드 = mapped_column(Unicode(6))
    종목명 = mapped_column(Unicode(15), nullable=False)
    종가 = mapped_column(Integer, nullable=False)
    대비 = mapped_column(Integer, nullable=False)
    등락률 = mapped_column(Numeric(6, 2), nullable=False)
    주당배당금 = mapped_column(Integer, nullable=False)
    배당수익률 = mapped_column(Numeric(5, 2), nullable=False)
    EPS = mapped_column(Integer)
    PER = mapped_column(Numeric(7, 2))
    선행_EPS = mapped_column(Integer)
    선행_PER = mapped_column(Numeric(9, 2))
    BPS = mapped_column(Integer)
    PBR = mapped_column(Numeric(7, 2))


class 유가증권상장사목록(Base):
    __tablename__ = '유가증권_상장사목록'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__유가증권_상장사__0E2DA8CA10B837C9'),
    )

    회사명 = mapped_column(Unicode(30), nullable=False)
    종목코드 = mapped_column(Unicode(6))
    업종 = mapped_column(Unicode, nullable=False)
    주요제품 = mapped_column(Unicode(100), nullable=False)
    상장일 = mapped_column(Date, nullable=False)
    결산월 = mapped_column(Unicode(5), nullable=False)
    대표자명 = mapped_column(Unicode, nullable=False)
    지역 = mapped_column(Unicode(10), nullable=False)
    홈페이지 = mapped_column(Unicode)


class 코스닥상장사목록(Base):
    __tablename__ = '코스닥_상장사목록'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__코스닥_상장사목__0E2DA8CA09581106'),
    )

    회사명 = mapped_column(Unicode(30), nullable=False)
    종목코드 = mapped_column(Unicode(6))
    업종 = mapped_column(Unicode, nullable=False)
    주요제품 = mapped_column(Unicode(100), nullable=False)
    상장일 = mapped_column(Date, nullable=False)
    결산월 = mapped_column(Unicode(5), nullable=False)
    대표자명 = mapped_column(Unicode, nullable=False)
    지역 = mapped_column(Unicode(10), nullable=False)
    홈페이지 = mapped_column(Unicode)
