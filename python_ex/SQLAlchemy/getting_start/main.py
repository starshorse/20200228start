"""
pip install sqlalchemy 
"""
from dotenv import load_dotenv
from pathlib import Path 
import os 
from sqlalchemy import create_engine,text 
import sqlalchemy as db 
import pandas as pd 

dotenv_path = Path('../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host );
engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/ezoffice', echo=True)

conn = engine.connect() 
print( engine.table_names()) 

"""
TB_ezct_계좌목록_codeFApi  
"""
result = engine.execute(text("select * from TB_ezct_계좌목록_codeFApi")) 

#print( result.all()) 
#result = result.all(); 

for row in result:
    print( row )

sql_query = pd.read_sql_query("select * from TB_ezct_계좌목록_codeFApi",engine)
df = pd.DataFrame( sql_query)

print( df ); 

metadata = db.MetaData() #extracting the metadata
division= db.Table('TB_ezct_계좌목록_codeFApi', metadata, autoload=True, 
autoload_with=engine) #Table object
print(repr(metadata.tables['TB_ezct_계좌목록_codeFApi']))


print(division.columns.keys())
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
query = db.insert( division )

values_list = [
    {'기관코드':'0004', 'resAccount':'63230104134614' }
]
result = engine.execute( query , values_list ) 

print( result ) 


