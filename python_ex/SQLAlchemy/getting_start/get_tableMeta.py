"""
    SQLAlchemy==1.4.0 
    Server: 34.64.60.213 
    Password : !csdlwlof#xxxx

"""
import os 
from sqlalchemy import create_engine,text, select  
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime 

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
#print(repr(metadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))
