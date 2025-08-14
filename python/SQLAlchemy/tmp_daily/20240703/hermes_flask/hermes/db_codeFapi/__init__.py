"""
pip install sqlalchemy 
"""
import os 
import pdb 
from datetime import datetime 
from hermes.database import db ,text, engine 
from hermes.db_codeFapi.sql_list import (set_dbName ,create_table_sellIn_tax_codeFApi,  create_table_sellIn_tax , post_process_sellIn_init ,   
create_table_sellOut_tax_codeFApi, create_table_sellOut_tax, post_process_sellOut_init ,
create_table_accountList_codeFApi as  create_table_accountList , create_table_transactions_codeFApi as create_table_transactions,
create_table_account_krTransaction , create_table_account_foreignTransaction,
insert_service_logSql , update_service_logSql,
update_table_service_info as update_table_service_infoSql ,
create_table_service_info 
)

from codeFApi.load_env  import load_env

load_env() 

def get_serviceList_codeFApi( service = '전자세금계산서목록' ):
    metadata = db.MetaData()
    serviceList  = db.Table('TB_고객서비스_codeFApi', metadata, autoload_with=engine ) 
    query = serviceList.select().where( serviceList.columns.서비스명 ==  service )
    result = conn.execute( query )
    return result 

def create_table_service_info():
    result = engine.execute(text( create_table_service_info ).execution_options( autocommit = True ))  
    return 

def update_table_service_info( org_name , auth_id , auth_y_M , auth_pass , buz_num ):
    query = update_table_service_infoSql( org_name , auth_id , auth_y_M , auth_pass , buz_num )
    result = engine.execute(text( query).execution_options( autocommit = True ))  
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
            query = create_table_sellOut_tax_codeFApi( db_name )    
            """
                second create client db  tables 
            """
            query = create_table_sellIn_tax( db_name )    
            query = create_table_sellOut_tax( db_name )    


def init_accountTrService():
    result = get_serviceList_codeFApi('계좌거래목록'); 
    for row in result:
        db_name = row._mapping['db_name']
        set_dbName( row._mapping['db_name'] )
        if( row._mapping['enabled'] == 1 ):
            query = create_table_accountList( db_name )
            query = create_table_transactions( db_name )
            query = create_table_account_krTransaction( db_name )
            conn.execute( query )
            query = create_table_account_foreignTransaction( db_name )
            conn.execute( query )

def insert_service_log( service_name , org_name , comment ):
    query = insert_service_logSql( service_name, org_name , comment )
    result = ''
    with conn.begin() as transaction:
        result = conn.execute(text( query )).fetchall() 
        transaction.commit() 
    return result 

def update_service_log( seq , comment ):
    query = update_service_logSql( seq , comment )
    result = conn.execute( query )
    return result 

