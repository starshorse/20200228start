"""
#1
    SQLAlchemy 2.0 (released 2023-01-26) requires that raw SQL queries be wrapped by sqlalchemy.text.
    The general solution for this error message is to pass the query text to sqlalchemy.text()
    from sqlalchemy import text
    ...
    query = text("SELECT * FROM some_table WHERE column1 > 1")

#2
    DatabaseError: ('HY000', '[HY000] [Microsoft][ODBC SQL Server Driver]Connection is busy with results for another hstmt (0) (SQLExecDirectW)')
    I was facing the same issue. This was fixed when I used fetchall() function. The following the code that I used.
    import pypyodbc as pyodbc
    def connect(self, query):
        con = pyodbc.connect(self.CONNECTION_STRING)
        cursor = con.cursor()
        print('Connection to db successful')
        cmd = (query)
        results = cursor.execute(cmd).fetchall()
        df = pd.read_sql(query, con)
        return df, results
    Using cursor.execute(cmd).fetchall() instead of cursor.execute(cmd) resolved it. Hope this helps.

   pip install sqlalchemy 
"""
from dotenv import load_dotenv
from pathlib import Path 
import os 
from sqlalchemy import create_engine,text 
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime 
from codeFApi.db.sql_list import (set_dbName ,create_table_sellIn_tax_codeFApi,  create_table_sellIn_tax , post_process_sellIn_init ,   
create_table_sellOut_tax_codeFApi, create_table_sellOut_tax, post_process_sellOut_init ,
create_table_accountList_codeFApi as  create_table_accountList , create_table_transactions_codeFApi as create_table_transactions,
create_table_account_krTransaction , create_table_account_foreignTransaction                          
)
# 20200228start/.env 파일 참조 
dotenv_path = Path('../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
# for windows pyodbc 
# engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)
engine = create_engine(f'mssql+pyodbc://{ sqlserver_id }:{ sqlserver_password }@{ sqlserver_host }/ezoffice?driver=ODBC Driver 17 for SQL Server', echo=True )

conn = engine.connect() 
#print( engine.table_names()) 
# get service table info. 

def get_serviceList_codeFApi( service = '전자세금계산서목록' ):
    metadata = db.MetaData()
    #serviceList  = db.Table('TB_고객서비스_codeFApi', metadata, autoload=True, autoload_with=engine ) 
    serviceList  = db.Table('TB_고객서비스_codeFApi', metadata, autoload_with=engine ) 
    query = serviceList.select().where( serviceList.columns.서비스명 ==  service )
    result = conn.execute( query )
    return result 

def init_taxService():
    result = get_serviceList_codeFApi(); 
    for row in result:
        db_name = row._mapping['db_name']
        set_dbName( row._mapping['db_name'] )
        if( row._mapping['enabled'] == 1 ):
            """
                first create ezoffice raw codeFApi   
            """
            query = create_table_sellIn_tax_codeFApi( db_name )    
            #conn.execute( query )
            query = create_table_sellOut_tax_codeFApi( db_name )    
            #conn.execute( query )
            """
                second create client db  tables 
            """
            query = create_table_sellIn_tax( db_name )    
            #conn.execute( query )
            #query = post_process_sellIn_init( db_name )
            #conn.execute( query )
            query = create_table_sellOut_tax( db_name )    
            #conn.execute( query )
            #query = post_process_sellOut_init( db_name )
            #conn.execute( query )


def init_accountTrService():
    result = get_serviceList_codeFApi('계좌거래목록'); 
    for row in result:
        db_name = row._mapping['db_name']
        set_dbName( row._mapping['db_name'] )
        if( row._mapping['enabled'] == 1 ):
            query = create_table_accountList( db_name )
            #conn.execute( query ) 
            query = create_table_transactions( db_name )
            #conn.execute( query )
            query = create_table_account_krTransaction( db_name )
            conn.execute( text( query ) ).fetchall()
            query = create_table_account_foreignTransaction( db_name )
            conn.execute( text( query ) ).fetchall()



