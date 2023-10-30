"""
pip install sqlalchemy 
"""
from dotenv import load_dotenv
from pathlib import Path 
import os 
from sqlalchemy import create_engine,text 
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime 
from codeFApi.db.sql_list import post_process_sellIn_merge , post_process_sellOut_merge 

dotenv_path = Path('../../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)

conn = engine.connect() 
print( engine.table_names()) 

def delete_taxList_m( month = 0, db_name='ezchemtech' ):
    if( month == 0 ):
        month = datetime.today().month
        query = f'delete from [TB_{ db_name }_매출전자세금계산서내역_codeFApi] where month( convert( date, resIssueDate, 112) ) = { month }' 
        result = engine.execute( query )
        print( result )
        query = f'delete from [TB_{ db_name }_매입전자세금계산서내역_codeFApi] where month( convert( date, resIssueDate, 112) ) = { month }' 
        result = engine.execute( query )
        print( result )

def insert_sellIn_taxList( taxList_data, db_name='ezchemtech' ):
    metadata = db.MetaData() #extracting the metadata
    taxList = db.Table(f'TB_{ db_name }_매입전자세금계산서내역_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_매입전자세금계산서내역_codeFApi']))
    print(taxList.columns.keys())
    query = db.insert( taxList )
    result = engine.execute( query , taxList_data ) 
    print( result ) 

def merge_sellIn_taxList( db_name='ezchemtech' ):
    query = post_process_sellIn_merge( db_name );
    result = engine.execute(text( query ).execution_options( autocommit = True  ))  
    print( result ) 

def insert_sellOut_taxList( taxList_data, db_name='ezchemtech' ):
    metadata = db.MetaData() #extracting the metadata
    taxList = db.Table(f'TB_{ db_name }_매출전자세금계산서내역_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_매출전자세금계산서내역_codeFApi']))
    print(taxList.columns.keys())
    query = db.insert( taxList )
    result = engine.execute( query , taxList_data ) 
    print( result ) 

def merge_sellOut_taxList( db_name='ezchemtech' ):
    query = post_process_sellOut_merge( db_name );
    result = engine.execute(text( query).execution_options( autocommit = True ))  
    print( result ) 
