"""
    SQLAlchemy==1.4.0 
    Server: 34.64.60.213 
    Password : !csdlwlof#xxxx

    op.create_table('stables',
        sa.Column('일자', sa.Date(), nullable=False),
        sa.Column('종목코드', sa.Unicode(length=6), nullable=False),
        sa.Column('종목명', sa.Unicode(length=14), nullable=False),
        sa.Column('관리여부', sa.Unicode(length=4), nullable=False),
        sa.Column('종가', sa.Unicode(length=9), nullable=False),
        sa.Column('EPS', sa.Unicode(length=7), nullable=False),
        sa.Column('PER', sa.Unicode(length=8), nullable=False),
        sa.Column('BPS', sa.Unicode(length=9), nullable=False),
        sa.Column('PBR', sa.Unicode(length=5), nullable=False),
        sa.Column('주당배당금', sa.Unicode(length=6), nullable=True),
        sa.Column('배당수익률', sa.Unicode(length=5), nullable=True),
        sa.PrimaryKeyConstraint('종목코드')
    )

    result = conn.execute( selEnt )
    for row in result:
        row._mapping['종목코드']

"""
import os 
from sqlalchemy import create_engine,text, select ,insert  
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime as dt  

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
#engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)
engine = create_engine('sqlite:///../alembic/test.db', echo=True );

conn = engine.connect() 
print( engine.table_names()) 

metadata = db.MetaData() #extracting the metadata
stables = db.Table('stables', metadata, autoload=True, autoload_with=engine) #Table object
print( select( stables ));
selEnt = select( stables );
#print(repr(wadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))

print( stables.c.keys() )

nwEnt = insert( stables).values( 일자= dt(2025,1,7), 종목코드="005930", 종목명="삼성전자", 관리여부="N" , 종가="53600" , EPS="400" , PER="10", BPS="400" , PBR="0.98" )

print( nwEnt ) 

with engine.connect() as conn:
    result = conn.execute( selEnt );
    for row in result:
        print(row);
    result = conn.execute( nwEnt )
    #conn.commit() 

#metadata.create_all( engine ); 


