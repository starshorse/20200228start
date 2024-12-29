
"""
sqlacodegen_v2 mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC+Driver+17+for+SQL+Server --outfile ezoffice-db-models.py
"""

from sqlalchemy import BigInteger, Column, Identity, Index, Integer, PrimaryKeyConstraint, Unicode, text
from sqlalchemy.dialects.mssql import DATETIMEOFFSET
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped
from hermes_DB.database import db 

#Base = declarative_base()
Base = db.Model 


class TBLog(Base):
    __tablename__ = 'TB_Log'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Log__DDDFBCBEBC754344'),
        Index('PK_TB_Log', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    historyId = mapped_column(BigInteger)
    requestType = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'))
    clientMachineType = mapped_column(Unicode(10, 'Korean_Wansung_CI_AS'))
    clientMachineHostName = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'))
    clientAppName = mapped_column(Unicode(128, 'Korean_Wansung_CI_AS'))
    clientAppPath = mapped_column(Unicode(256, 'Korean_Wansung_CI_AS'))
    clientAppVersion = mapped_column(Unicode(20, 'Korean_Wansung_CI_AS'))
    clientAppProcessedTime = mapped_column(DATETIMEOFFSET)
    rowNum = mapped_column(Integer)
    dbName = mapped_column(Unicode(30, 'Korean_Wansung_CI_AS'))
    tableName = mapped_column(Unicode(30, 'Korean_Wansung_CI_AS'))
    keyValue = mapped_column(Integer)
    queryType = mapped_column(Unicode(10, 'Korean_Wansung_CI_AS'))
    query = mapped_column(Unicode(collation='Korean_Wansung_CI_AS'))
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))


class TBLogCollector(Base):
    __tablename__ = 'TB_Log_Collector'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Log_C__DDDFBCBEA0171338'),
        Index('PK_TB_Log_Collector', 'seq', unique=True)
    )

    seq = mapped_column(BigInteger, Identity(start=1, increment=1))
    query = mapped_column(Unicode(collation='Korean_Wansung_CI_AS'), nullable=False)
    hostname = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'), nullable=False)
    RegDate = mapped_column(DATETIMEOFFSET, nullable=False, server_default=text('(getdate())'))
    filepath = mapped_column(Unicode(collation='Korean_Wansung_CI_AS'))
    errormessage = mapped_column(Unicode(200, 'Korean_Wansung_CI_AS'))
    rownum = mapped_column(Integer)
    target = mapped_column(Integer)


class TBBullentinBoard(Base):
    __tablename__ = 'TB_bullentinBoard'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_bulle__DDDFBCBEB28ABD14'),
        Index('PK__TB_bulle__DDDFBCBE713738BD', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    user = mapped_column(Unicode(100, 'Korean_Wansung_CI_AS'), nullable=False)
    title = mapped_column(Unicode(100, 'Korean_Wansung_CI_AS'), nullable=False)
    contents = mapped_column(Unicode(collation='Korean_Wansung_CI_AS'))
    video_url = mapped_column(Unicode(100, 'Korean_Wansung_CI_AS'))
    regDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    hits = mapped_column(Integer, server_default=text('((0))'))


class TBJupitor관리회사(Base):
    __tablename__ = 'TB_jupitor_관리회사'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_jupit__DDDFBCBE1779D513'),
        Index('PK__TB_jupit__DDDFBCBEA1FF52C5', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    RegDate = mapped_column(DATETIMEOFFSET, nullable=False, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, nullable=False, server_default=text('(getdate())'))
    name = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'))
    port = mapped_column(Integer)
    dataPath = mapped_column(Unicode(100, 'Korean_Wansung_CI_AS'))
    imgUrl = mapped_column(Unicode(100, 'Korean_Wansung_CI_AS'))
    server_name = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'))
    db_name = mapped_column(Unicode(50, 'Korean_Wansung_CI_AS'))
    enabled = mapped_column(Integer)


class TBUploadFile(Base):
    __tablename__ = 'TB_uploadFile'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_uploa__DDDFBCBEEDA70013'),
        Index('PK__TB_uploa__DDDFBCBE7E994F9E', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    file_name = mapped_column(Unicode(255, 'Korean_Wansung_CI_AS'), nullable=False)
    path = mapped_column(Unicode(255, 'Korean_Wansung_CI_AS'))
    user_id = mapped_column(Unicode(255, 'Korean_Wansung_CI_AS'))
