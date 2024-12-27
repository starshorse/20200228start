import pandas as pd
from dotenv import load_dotenv
from pathlib import Path 
import os 
from sqlalchemy import create_engine,text 
import sqlalchemy as db 
from datetime import datetime 
import pdb 
"""
    git repositery xlsx file , pandas excdel read / monthly sum df.
"""
def get_sampleSale_data():
    df = pd.read_excel("https://github.com/chris1610/pbpython/blob/master/data/sample-salesv3.xlsx?raw=True")
    df["date"] = pd.to_datetime(df['date'])
    print( df.head())
    print(df.set_index('date').resample('M')["ext price"].sum() )
    return df 


def get_DB_conn( db_name = 'KORSP' ):
    """
        2024-02-21 
        upload data to sqlserver DB using sqlalchemy 
    """
    dotenv_path = Path('../../../.env')
    load_dotenv( dotenv_path = dotenv_path ) 

    sqlserver_host = os.environ.get('SQLSERVER_HOST')
    sqlserver_id = os.environ.get('SQLSERVER_ID') 
    sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

    print( sqlserver_host );
    engine = create_engine(f'mssql+pymssql://{ sqlserver_id }:{ sqlserver_password}@{ sqlserver_host }/{ db_name }', echo=True)

    conn = engine.connect() 
    #print( engine.table_names()) 
    #metadata = db.MetaData() #extracting the metadata
    #metadata.reflect( engine )
    """
    # get all tables columns 

    for table in metadata.tables.values():
        print(table.name)
        for column in table.c:
            print( column.name )
    """        
    return conn
"""
put_df2DB
    dataFrame :  Data for DB create table and insert. 
    DB_conn   :  sqlalchemy DB connection object.. 
"""
def put_df2DB( dataFrame , DB_conn ):
    dataFrame.to_sql('sample-sales', DB_conn, if_exists='append' );

if __name__=='__main__':
    #df = get_sampleSale_data();
    conn = get_DB_conn();
    #put_df2DB( df, conn );

    sql = '''
     select top (1000) * from [sample-sales]
    '''
    df = pd.read_sql_query( sql, conn )
    df = df.set_index('date').resample('M')["ext price"].sum() 
    df = df.reset_index().rename( columns={"index":"date"})
    df['year'] = df['date'].dt.year 
    df['month'] = df['date'].dt.month 
    #df['ext price'] =  df['ext price'].apply( lambda x: "${:.1f}k".format(( x/1000 )))
    df['ext price'] =  df['ext price'].apply( lambda x: "{:,.0f}".format( x ))
    df = df.pivot( index='year', columns='month', values='ext price' )
    print( df )
    print( df.to_html() )
    #pdb.set_trace();
