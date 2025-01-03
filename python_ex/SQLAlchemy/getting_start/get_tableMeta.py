"""
    SQLAlchemy==1.4.0 
    Server: 34.64.60.213 
    Password : !csdlwlof#xxxx

"""
import os 
from sqlalchemy import create_engine,text 
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)

conn = engine.connect() 
print( engine.table_names()) 

metadata = db.MetaData() #extracting the metadata
#account_list = db.Table(f'TB_{ db_name }_계좌목록_codeFApi', metadata, autoload=True, 
#autoload_with=engine) #Table object
print(repr(metadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))
