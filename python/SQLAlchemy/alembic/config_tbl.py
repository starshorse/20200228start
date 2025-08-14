from typing import List, Optional

from sqlalchemy import BigInteger, CHAR, Column, ForeignKeyConstraint, Identity, Index, Integer, PrimaryKeyConstraint, Unicode, text
from sqlalchemy.dialects.mssql import DATETIMEOFFSET, TINYINT
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship
from sqlalchemy.orm.base import Mapped

Base = declarative_base()


class TBAdmin(Base):
    __tablename__ = 'TB_Admin'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Admin__DDDFBCBE310DFEC1'),
        Index('IX_TB_Admin_dbName_email', 'dbName', 'email', unique=True),
        Index('PK__TB_Admin__DDDFBCBE2C011219', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    createdAt = mapped_column(DATETIMEOFFSET, nullable=False)
    updatedAt = mapped_column(DATETIMEOFFSET, nullable=False)
    dbName = mapped_column(Unicode(20))
    authOrgUserSeq = mapped_column(Integer)
    id_jpt = mapped_column(Integer)
    name = mapped_column(Unicode(120))
    position = mapped_column(Unicode(120))
    level = mapped_column(Integer)
    password = mapped_column(Unicode(120))
    email = mapped_column(Unicode(120))
    important = mapped_column(Integer)
    ¾àÄª = mapped_column(Unicode(120))
    jandi_id_map = mapped_column(Unicode(120))
    depart = mapped_column(Unicode(120))
    configuration = mapped_column(Unicode(120))
    userSeq = mapped_column(Integer)
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    passcode = mapped_column(Unicode(256))


class TBLog(Base):
    __tablename__ = 'TB_Log'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Log__DDDFBCBE5D15634F'),
        Index('PK_TB_Log', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    historyId = mapped_column(BigInteger)
    requestType = mapped_column(Unicode(50))
    clientMachineType = mapped_column(Unicode(10))
    clientMachineHostName = mapped_column(Unicode(50))
    clientAppName = mapped_column(Unicode(128))
    clientAppPath = mapped_column(Unicode(256))
    clientAppVersion = mapped_column(Unicode(20))
    clientAppProcessedTime = mapped_column(DATETIMEOFFSET)
    rowNum = mapped_column(Integer)
    dbName = mapped_column(Unicode(30))
    tableName = mapped_column(Unicode(30))
    keyValue = mapped_column(Integer)
    queryType = mapped_column(Unicode(10))
    query = mapped_column(Unicode)
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))


class TBLogCollector(Base):
    __tablename__ = 'TB_Log_Collector'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Log_C__DDDFBCBEA6500084'),
        Index('PK_TB_Log_Collector', 'seq', unique=True)
    )

    seq = mapped_column(BigInteger, Identity(start=1, increment=1))
    query = mapped_column(Unicode, nullable=False)
    hostname = mapped_column(Unicode(50), nullable=False)
    RegDate = mapped_column(DATETIMEOFFSET, nullable=False, server_default=text('(getdate())'))
    filepath = mapped_column(Unicode)
    errormessage = mapped_column(Unicode(200))
    rownum = mapped_column(Integer)
    target = mapped_column(Integer)


class TBOrganization(Base):
    __tablename__ = 'TB_Organization'
    __table_args__ = (
        PrimaryKeyConstraint('seq', name='PK__TB_Organ__DDDFBCBEA3771419'),
        Index('PK_TB_Organization', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    mainDB = mapped_column(Unicode(64), nullable=False)
    orgName = mapped_column(Unicode(64), nullable=False)
    orgCommonName = mapped_column(Unicode(64), nullable=False)
    orgFullName = mapped_column(Unicode(128), nullable=False)
    orgType = mapped_column(Unicode(4), nullable=False)
    orgBRN = mapped_column(CHAR(12, 'Korean_Wansung_CI_AS'), nullable=False)
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))

    TB_Auth_Organization: Mapped[List['TBAuthOrganization']] = relationship('TBAuthOrganization', uselist=True, back_populates='TB_Organization')
    TB_User: Mapped[List['TBUser']] = relationship('TBUser', uselist=True, back_populates='TB_Organization')
    TB_Auth_Machine: Mapped[List['TBAuthMachine']] = relationship('TBAuthMachine', uselist=True, back_populates='TB_Organization')


class TBAuthOrganization(Base):
    __tablename__ = 'TB_Auth_Organization'
    __table_args__ = (
        ForeignKeyConstraint(['orgSeq'], ['TB_Organization.seq'], name='FK__TB_Auth_O__orgSe__440B1D61'),
        PrimaryKeyConstraint('seq', name='PK__TB_Auth___DDDFBCBE03D0DEEA'),
        Index('IX_TB_Auth_Organization_seq_orgSeq', 'seq', 'orgSeq', unique=True),
        Index('PK_TB_Auth_Organization', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    orgSeq = mapped_column(Integer, nullable=False)
    authKey = mapped_column(Unicode(64), nullable=False)
    orgAuthSecret = mapped_column(Unicode(256), nullable=False)
    orgAuthSecretExpiredDateTime = mapped_column(DATETIMEOFFSET, nullable=False)
    remark = mapped_column(Unicode(128))
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))

    TB_Organization: Mapped['TBOrganization'] = relationship('TBOrganization', back_populates='TB_Auth_Organization')
    TB_User: Mapped[List['TBUser']] = relationship('TBUser', uselist=True, back_populates='TB_Auth_Organization')
    TB_Auth_Machine: Mapped[List['TBAuthMachine']] = relationship('TBAuthMachine', uselist=True, back_populates='TB_Auth_Organization')


class TBUser(Base):
    __tablename__ = 'TB_User'
    __table_args__ = (
        ForeignKeyConstraint(['authOrgSeq'], ['TB_Auth_Organization.seq'], name='FK__TB_User__authOrg__4AB81AF0'),
        ForeignKeyConstraint(['orgSeq'], ['TB_Organization.seq'], name='FK__TB_User__orgSeq__49C3F6B7'),
        PrimaryKeyConstraint('seq', name='PK__TB_User__DDDFBCBEF937B22D'),
        Index('IX_TB_User_seq_orgSeq_authOrgSeq', 'seq', 'orgSeq', 'authOrgSeq', unique=True),
        Index('PK_TB_User', 'seq', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    orgSeq = mapped_column(Integer, nullable=False)
    authOrgSeq = mapped_column(Integer, nullable=False)
    defaultDB = mapped_column(Unicode(100))
    dbLoginID = mapped_column(Unicode(100))
    dbLoginPWD = mapped_column(Unicode(100))
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))

    TB_Auth_Organization: Mapped['TBAuthOrganization'] = relationship('TBAuthOrganization', back_populates='TB_User')
    TB_Organization: Mapped['TBOrganization'] = relationship('TBOrganization', back_populates='TB_User')
    TB_Auth_Machine: Mapped[List['TBAuthMachine']] = relationship('TBAuthMachine', uselist=True, back_populates='TB_User')


class TBAuthMachine(Base):
    __tablename__ = 'TB_Auth_Machine'
    __table_args__ = (
        ForeignKeyConstraint(['authOrgSeq'], ['TB_Auth_Organization.seq'], name='FK__TB_Auth_M__authO__5812160E'),
        ForeignKeyConstraint(['orgSeq'], ['TB_Organization.seq'], ondelete='SET NULL', name='FK__TB_Auth_M__orgSe__571DF1D5'),
        ForeignKeyConstraint(['userSeq'], ['TB_User.seq'], ondelete='SET NULL', name='FK__TB_Auth_M__userS__59063A47'),
        PrimaryKeyConstraint('seq', name='PK__TB_Auth___DDDFBCBE7F9FA43B'),
        Index('IX_TB_Auth_Machine_seq_orgSeq_authOrgSeq_userSeq', 'seq', 'orgSeq', 'authOrgSeq', 'userSeq', unique=True),
        Index('PK_TB_Auth_Machine', 'seq', unique=True),
        Index('UX_TB_Auth_Machine_machAuthSecret', 'machAuthSecret', unique=True)
    )

    seq = mapped_column(Integer, Identity(start=1, increment=1))
    authOrgSeq = mapped_column(Integer, nullable=False)
    isUnattended = mapped_column(TINYINT, nullable=False, server_default=text('((0))'))
    machAuthSecret = mapped_column(Unicode(256), nullable=False)
    machAuthSecretExpiredDateTime = mapped_column(DATETIMEOFFSET, nullable=False)
    userMemo = mapped_column(Unicode(256), nullable=False, server_default=text("(N'(N@')"))
    orgSeq = mapped_column(Integer)
    userSeq = mapped_column(Integer)
    authOrgUserSeq = mapped_column(Integer)
    machAuthIdentifier = mapped_column(Unicode(128))
    machInfo = mapped_column(Unicode(200))
    RegDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))
    UpdateDate = mapped_column(DATETIMEOFFSET, server_default=text('(getdate())'))

    TB_Auth_Organization: Mapped['TBAuthOrganization'] = relationship('TBAuthOrganization', back_populates='TB_Auth_Machine')
    TB_Organization: Mapped[Optional['TBOrganization']] = relationship('TBOrganization', back_populates='TB_Auth_Machine')
    TB_User: Mapped[Optional['TBUser']] = relationship('TBUser', back_populates='TB_Auth_Machine')
