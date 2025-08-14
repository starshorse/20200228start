from hermes_DB.database import db 

class Board( db.Model ):
    __tablename__ = 'TB_Board'
    seq = db.Column( db.Integer , primary_key=True ) 
    title = db.Column( db.String(50) , unique=True )
    content = db.Column( db.String )
    ownerSeq = db.Column( db.Integer )
    def __init__( self , title, ownerSeq ): 
        self.title = title
        self.ownerSeq = ownerSeq 
    def __repr__( self ):
        return '<Board %r >' % ( self.title , )     
"""
    op.create_table('TB_Log',
    db.Column('seq', db.INTEGER(), db.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    db.Column('historyId', db.BIGINT(), autoincrement=False, nullable=True),
    db.Column('requestType', db.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientMachineType', db.NVARCHAR(length=10, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientMachineHostName', db.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientAppName', db.NVARCHAR(length=128, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientAppPath', db.NVARCHAR(length=256, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientAppVersion', db.NVARCHAR(length=20, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('clientAppProcessedTime', mssql.DATETIMEOFFSET(), autoincrement=False, nullable=True),
    db.Column('rowNum', db.INTEGER(), autoincrement=False, nullable=True),
    db.Column('dbName', db.NVARCHAR(length=30, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('tableName', db.NVARCHAR(length=30, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('keyValue', db.INTEGER(), autoincrement=False, nullable=True),
    db.Column('queryType', db.NVARCHAR(length=10, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('query', db.NVARCHAR(collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('RegDate', mssql.DATETIMEOFFSET(), server_default=db.text('(getdate())'), autoincrement=False, nullable=True),
    db.Column('UpdateDate', mssql.DATETIMEOFFSET(), server_default=db.text('(getdate())'), autoincrement=False, nullable=True),
    db.PrimaryKeyConstraint('seq', name='PK__TB_Log__DDDFBCBEBC754344')
    )
    op.create_table('TB_uploadFile',
    db.Column('seq', db.INTEGER(), db.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    db.Column('file_name', db.NVARCHAR(length=255, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=False),
    db.Column('path', db.NVARCHAR(length=255, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('user_id', db.NVARCHAR(length=255, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.PrimaryKeyConstraint('seq', name='PK__TB_uploa__DDDFBCBEEDA70013')
    )
    op.create_table('TB_jupitor_관리회사',
    db.Column('seq', db.INTEGER(), db.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    db.Column('RegDate', mssql.DATETIMEOFFSET(), server_default=db.text('(getdate())'), autoincrement=False, nullable=False),
    db.Column('UpdateDate', mssql.DATETIMEOFFSET(), server_default=db.text('(getdate())'), autoincrement=False, nullable=False),
    db.Column('name', db.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('port', db.INTEGER(), autoincrement=False, nullable=True),
    db.Column('dataPath', db.NVARCHAR(length=100, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('imgUrl', db.NVARCHAR(length=100, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('server_name', db.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('db_name', db.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    db.Column('enabled', db.INTEGER(), autoincrement=False, nullable=True),
    db.PrimaryKeyConstraint('seq', name='PK__TB_jupit__DDDFBCBE1779D513')
    )
    op.create_table('TB_Log_Collector',
    sa.Column('seq', sa.BIGINT(), sa.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    sa.Column('query', sa.NVARCHAR(collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=False),
    sa.Column('hostname', sa.NVARCHAR(length=50, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=False),
    sa.Column('filepath', sa.NVARCHAR(collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    sa.Column('errormessage', sa.NVARCHAR(length=200, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    sa.Column('rownum', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('target', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('RegDate', mssql.DATETIMEOFFSET(), server_default=sa.text('(getdate())'), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('seq', name='PK__TB_Log_C__DDDFBCBEA0171338')
    )
    op.create_table('TB_bullentinBoard',
    sa.Column('seq', sa.INTEGER(), sa.Identity(always=False, start=1, increment=1), autoincrement=True, nullable=False),
    sa.Column('user', sa.NVARCHAR(length=100, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=False),
    sa.Column('title', sa.NVARCHAR(length=100, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=False),
    sa.Column('contents', sa.NVARCHAR(collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    sa.Column('video_url', sa.NVARCHAR(length=100, collation='Korean_Wansung_CI_AS'), autoincrement=False, nullable=True),
    sa.Column('regDate', mssql.DATETIMEOFFSET(), server_default=sa.text('(getdate())'), autoincrement=False, nullable=True),
    sa.Column('hits', sa.INTEGER(), server_default=sa.text('((0))'), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('seq', name='PK__TB_bulle__DDDFBCBEB28ABD14')
    )
"""    
