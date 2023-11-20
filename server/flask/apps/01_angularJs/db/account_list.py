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
from db.sql_list import post_process_accountTransaction_1 , post_process_accountTransaction_foreign 

dotenv_path = Path('../../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)

conn = engine.connect() 
print( engine.table_names()) 

"""
TB_{ db_name }_계좌목록_codeFApi  
result = engine.execute(text("select * from TB_{ db_name }_계좌목록_codeFApi")) 
for row in result:
    print( row )
sql_query = pd.read_sql_query("select * from TB_{ db_name }_계좌목록_codeFApi",engine)
df = pd.DataFrame( sql_query)
print( df ); 
"""

def insert_accountList( org_code , account_list_data, db_name='ezchemtech' ):
    metadata = db.MetaData() #extracting the metadata
    account_list = db.Table(f'TB_{ db_name }_계좌목록_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))

    print(account_list.columns.keys())
    """
    [
    'seq', 
    '기관코드', 
    'resAccount', 
    'resAccountBalance', 
    'resAccountDeposit', 
    'resAccountNickName', 
    'resAccountStartDate', 
    'resAccountEndDate', 
    'resAccountName', 
    'resAccountDisplay', 
    'resAccountCurrency', 
    'resLastTranDate', 
    'resOverdraftAcctYN', 
    'resLoanKind', 
    'resLoanBalance', 
    'resLoanStartDate', 
    'resLoanEndDate'
    ]
    query = db.delete( account_list ).where( account_list.c['기관코드'] == org_code )
    engine.execute( query ) 
    """

    query = db.insert( account_list )
    """
    values_list = [
        {'기관코드':'0004', 'resAccount':'63230104134614' }
    ]
    """
    for x in account_list_data:
        x['기관코드'] = org_code 
    
    print( account_list_data ); 
    result = engine.execute( query , account_list_data ) 
    print( result ) 

def insert_accountTransaction( account_transaction_data, db_name='ezchemtech' ):
    metadata = db.MetaData() #extracting the metadata
    account_transaction = db.Table(f'TB_{ db_name }_계좌거래내역_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_계좌거래내역_codeFApi']))
    print(account_transaction.columns.keys())
    query = db.insert( account_transaction )
    result = engine.execute( query , account_transaction_data ) 
    print( result ) 

def merge_accountTr_kr(db_name='ezchemtech'):
    print( post_process_accountTransaction_1( db_name ) ); 
    rs = engine.execute(text( post_process_accountTransaction_1( db_name ) ).execution_options( autocommit = True ))
    print( rs.rowcount ) 

def merge_accountTr_foreign( db_name='ezchemtech'):
    print( post_process_accountTransaction_foreign( db_name) ); 
    rs = engine.execute(text( post_process_accountTransaction_foreign( db_name ) ).execution_options( autocommit = True ))
    print( rs.rowcount ) 


def get_accountList( db_name='ezchemtech'):
    metadata = db.MetaData() #extracting the metadata
    account_list = db.Table(f'TB_{ db_name }_계좌목록_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))
    query = db.select( account_list ); 
    rows = engine.execute( query ); 
    return rows  
    
def delete_accountList( org_code, db_name='ezchemtech' ):
    metadata = db.MetaData() #extracting the metadata
    account_list = db.Table(f'TB_{ db_name }_계좌목록_codeFApi', metadata, autoload=True, 
    autoload_with=engine) #Table object
    print(repr(metadata.tables[f'TB_{ db_name }_계좌목록_codeFApi']))

    print(account_list.columns.keys())
    """
    [
    'seq', 
    '기관코드', 
    'resAccount', 
    'resAccountBalance', 
    'resAccountDeposit', 
    'resAccountNickName', 
    'resAccountStartDate', 
    'resAccountEndDate', 
    'resAccountName', 
    'resAccountDisplay', 
    'resAccountCurrency', 
    'resLastTranDate', 
    'resOverdraftAcctYN', 
    'resLoanKind', 
    'resLoanBalance', 
    'resLoanStartDate', 
    'resLoanEndDate'
    ]
    """
    query = db.delete( account_list ).where( account_list.c['기관코드'] == org_code )
    engine.execute( query ) 


def delete_accountTransaction_m( month = 0, db_name='ezchemtech' ):
    if( month == 0 ):
        month = datetime.today().month
        query = f'delete from [TB_{ db_name }_계좌거래내역_codeFApi] where month( convert( date, resAccountTrDate, 112) ) = { month }' 
        result = engine.execute( query )
        print( result )








