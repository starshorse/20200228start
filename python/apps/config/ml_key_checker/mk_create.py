import pymssql 
import jwt 
import pandas as pd 
import pdb 
import copy 

import sys, os 
from dotenv import load_dotenv
from pathlib import Path 
dotenv_path = Path('../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 
sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import machinekey 
import my_pandas 
import my_pymssql 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

org_name = 'ezchemtech' 
machinekey.setCompany( org_name ) 

ezchemtech_ml_key = { 'company': org_name , 'source':'excel', 'id':'richard.choi@ez-office.co.kr' , 'type': 'Machine' } 
HADES_1_KEY = 'ez-office.co.kr'
machinekey.setHADES_1_KEY( HADES_1_KEY)

encode_jwt =  machinekey.jwt_encode( ezchemtech_ml_key , HADES_1_KEY ) 
print('encode key', encode_jwt ) 

decode_ml_key = machinekey.jwt_decode( encode_jwt , HADES_1_KEY )
print( ezchemtech_ml_key , decode_ml_key ) 

conn1  = my_pymssql.connect( sqlserver_host , 'config', sqlserver_id , sqlserver_password ) 
sql = 'select * from dbo.TB_Auth_Machine' 
df1 = my_pandas.read_sql( sql, conn1 ) 
print( df1 )

"""
pdb.set_trace() 
#print( ezchemtech_ml_key , decode_ml_key ) 
#print( decode_ml_key['company'] ) 

conn1 = pymssql.connect( server='', database = 'config' , user='sqlserver' , password = '' )
"""
sql = 'select * from dbo.TB_Auth_Machine' 
df1 = my_pandas.read_sql( sql, conn1 ) 
sql = 'select * from dbo.TB_Auth_Organization' 
df2 = my_pandas.read_sql( sql, conn1 ) 

df1 = my_pandas.merge_left(  df1 , df2 , 'orgSeq', 'seq' ) 

print( df1[['machInfo','authKey']])
print( df1.columns )

conn2 = my_pymssql.connect( sqlserver_host,  'ezchemtech' , sqlserver_id , sqlserver_password )
sql = 'select * from dbo.TB_Admin_1' 
df3 = my_pandas.read_sql( sql, conn2 ) 
print( df3.email )

"""

df4 = df3[['seq','email']] 
org_seq = df2[df2['defaultDB'] == org_name ]['seq'] 

sql = f"DELETE FROM config.dbo.TB_Auth_Machine WHERE authOrgSeq = { org_seq.values[0] }" 
cursor = conn1.cursor()
cursor.execute( sql )
conn1.commit() 

for index , row in  df4.iterrows():
    key_seed = copy.deepcopy( ezchemtech_ml_key ) 
    key_seed['id'] = row['email'] 
    encode_jwt = jwt.encode( key_seed , HADES_1_KEY , 'HS256' ) 
    decode_ml_key = jwt.decode( encode_jwt , HADES_1_KEY, 'HS256' ) 
    #print( decode_ml_key , encode_jwt ) 
    org_user_seq = row['seq'] 
    sql = f"INSERT INTO config.dbo.TB_Auth_Machine (authOrgSeq,authOrgUserSeq,machAuthSecret,machAuthSecretExpiredDateTime) VALUES ( { org_seq.values[0] } , { org_user_seq }, '{ encode_jwt }' ,'2022-12-28 00:00:00')"
    print( sql )
    cursor = conn1.cursor() 
    cursor.execute( sql ) 
    conn1.commit() 

pdb.set_trace() 
conn1.close()
conn2.close()
"""
