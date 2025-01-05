import os 
from sqlalchemy import create_engine,text, inspect 
import sqlalchemy as db 
import pandas as pd 
from datetime import datetime 
import pandas as pd 
import pdb

sqlserver_host = '192.168.0.106'
sqlserver_host = 'localhost'
sqlserver_id = 'sa'
sqlserver_password = '1234' 

print( sqlserver_host );
# ubuntu 18.04 
engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/KORSP', echo=True)
# windows 10 
# sqlalchemy.url = mssql+pyodbc://sa:1234@192.168.0.106:1433/KORSP?driver=ODBC+Driver+17+for+SQL+Server 
# engine = create_engine(f'mssql+pyodbc://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/KORSP?dirver=ODBC+Driver+17+for+SQL+Server', echo=True)
# connection_uri = db.engine.url.URL.create( "mssql+pyodbc", username=sqlserver_id, password=sqlserver_password, host=sqlserver_host , database="ezoffice" , query={"trusted_connection":"yes","driver":"ODBC Driver 17 for SQL Server"})
# engine = create_engine( connection_uri , fast_executemany = True );


#df = pd.read_sql_table('pykrx', con=engine )
#print( df)

conn = engine.connect() 
#pdb.set_trace();
# print( engine.table_names()) 
# inspection = inspect(engine)
# print( inspection.get_tables_names() )

metadata = db.MetaData() #extracting the metadata
#account_list = db.Table(f'TB_{ db_name }_계좌목록_codeFApi', metadata, autoload=True, 
#autoload_with=engine) #Table object

metadata.reflect( engine )
for table in metadata.tables.values():
    print(table.name)
    for column in table.c:
        print( column.name )


print(repr(metadata.tables[f'유가증권_상장사목록']))
mymodel =  metadata.tables[f'유가증권_상장사목록']




