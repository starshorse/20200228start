from sqlalchemy import BigInteger, Column, Date, DateTime, Float, Index, Integer, Numeric, PrimaryKeyConstraint, String, Table, Unicode
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped

Base = declarative_base()
metadata = Base.metadata


t_VW_stock_mine = Table(
    'VW_stock_mine', metadata,
    Column('종목명', Unicode(14, 'Korean_Wansung_CI_AS')),
    Column('종목코드', Unicode(6, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('PER', Unicode(8, 'Korean_Wansung_CI_AS')),
    Column('PBR', Unicode(5, 'Korean_Wansung_CI_AS')),
    Column('배당수익률', Unicode(5, 'Korean_Wansung_CI_AS'))
)


t_VW_stock_mine_basics = Table(
    'VW_stock_mine_basics', metadata,
    Column('회사명', Unicode(30, 'Korean_Wansung_CI_AS')),
    Column('종목코드', Unicode(6, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('업종', Unicode(collation='Korean_Wansung_CI_AS')),
    Column('주요제품', Unicode(100, 'Korean_Wansung_CI_AS')),
    Column('상장일', Date),
    Column('결산월', Unicode(5, 'Korean_Wansung_CI_AS')),
    Column('대표자명', Unicode(collation='Korean_Wansung_CI_AS')),
    Column('홈페이지', Unicode(collation='Korean_Wansung_CI_AS')),
    Column('지역', Unicode(10, 'Korean_Wansung_CI_AS'))
)


t_low_pbr_high_div = Table(
    'low_pbr_high_div', metadata,
    Column('종목코드', Unicode(6, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('종목명', Unicode(15, 'Korean_Wansung_CI_AS'), nullable=False),
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
        PrimaryKeyConstraint('종목코드', name='PK__mine__0E2DA8CA5D6AB06B'),
    )

    종목코드 = mapped_column(Unicode(6, 'Korean_Wansung_CI_AS'))


t_pykrx_time = Table(
    'pykrx_time', metadata,
    Column('일자', Date, nullable=False),
    Column('종목코드', Unicode(6, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('종목명', Unicode(14, 'Korean_Wansung_CI_AS'), nullable=False),
    Column('관리여부', Unicode(4, 'Korean_Wansung_CI_AS')),
    Column('PER', Unicode(8, 'Korean_Wansung_CI_AS')),
    Column('PBR', Unicode(5, 'Korean_Wansung_CI_AS')),
    Column('배당수익률', Unicode(5, 'Korean_Wansung_CI_AS'))
)


t_sample_sales = Table(
    'sample-sales', metadata,
    Column('index', BigInteger),
    Column('account number', BigInteger),
    Column('name', String(collation='Korean_Wansung_CI_AS')),
    Column('sku', String(collation='Korean_Wansung_CI_AS')),
    Column('quantity', BigInteger),
    Column('unit price', Float(53)),
    Column('ext price', Float(53)),
    Column('date', DateTime),
    Index('ix_sample-sales_index', 'index')
)


class Stables(Base):
    __tablename__ = 'stables'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__stables__0E2DA8CAE218138C'),
    )

    일자 = mapped_column(Date, nullable=False)
    종목코드 = mapped_column(Unicode(6, 'Korean_Wansung_CI_AS'))
    종목명 = mapped_column(Unicode(14, 'Korean_Wansung_CI_AS'), nullable=False)
    관리여부 = mapped_column(Unicode(4, 'Korean_Wansung_CI_AS'), nullable=False)
    종가 = mapped_column(Unicode(9, 'Korean_Wansung_CI_AS'), nullable=False)
    EPS = mapped_column(Unicode(7, 'Korean_Wansung_CI_AS'), nullable=False)
    PER = mapped_column(Unicode(8, 'Korean_Wansung_CI_AS'), nullable=False)
    BPS = mapped_column(Unicode(9, 'Korean_Wansung_CI_AS'), nullable=False)
    PBR = mapped_column(Unicode(5, 'Korean_Wansung_CI_AS'), nullable=False)
    주당배당금 = mapped_column(Unicode(6, 'Korean_Wansung_CI_AS'))
    배당수익률 = mapped_column(Unicode(5, 'Korean_Wansung_CI_AS'))


class StablesNw(Base):
    __tablename__ = 'stables_nw'
    __table_args__ = (
        PrimaryKeyConstraint('종목코드', name='PK__stables___0E2DA8CA5C76CD91'),
    )

    종목코드 = mapped_column(Unicode(6, 'Korean_Wansung_CI_AS'))
    종목명 = mapped_column(Unicode(15, 'Korean_Wansung_CI_AS'), nullable=False)
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


t_매매일지 = Table(
    '매매일지', metadata,
    Column('순번', Integer),
    Column('종목', String(512, 'Korean_Wansung_CI_AS')),
    Column('코드', Integer),
    Column('업종', String(512, 'Korean_Wansung_CI_AS')),
    Column('날짜', String(512, 'Korean_Wansung_CI_AS')),
    Column('수량', Integer),
    Column('매수매도가', String(512, 'Korean_Wansung_CI_AS')),
    Column('매수_매도', String(512, 'Korean_Wansung_CI_AS')),
    Column('코스피', String(512, 'Korean_Wansung_CI_AS')),
    Column('삼성전자', String(512, 'Korean_Wansung_CI_AS')),
    Column('요일', String(512, 'Korean_Wansung_CI_AS'))
)
