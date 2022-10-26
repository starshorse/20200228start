import pymssql 
import jwt 
import pandas as pd 
import pdb 
import copy 

org_name = 'ezchemtech' 

ezchemtech_ml_key = { 'company': org_name , 'source':'excel', 'id':'richard.choi@ez-office.co.kr' , 'type': 'Machine' } 
HADES_1_KEY = 'ez-office.co.kr'

encode_jwt =  jwt.encode( ezchemtech_ml_key , HADES_1_KEY, 'HS256' ) 
print('encode key', encode_jwt ) 

decode_ml_key = jwt.decode( encode_jwt , HADES_1_KEY, 'HS256' )
#print( ezchemtech_ml_key , decode_ml_key ) 
#print( decode_ml_key['company'] ) 

conn1 = pymssql.connect( server='34.64.110.64', database = 'config' , user='sqlserver' , password = '!csdlwlof#1286' )
sql = 'select * from dbo.TB_Auth_Machine' 
df1 = pd.read_sql( sql, con=conn1 ) 
sql = 'select * from dbo.TB_Auth_Organization' 
df2 = pd.read_sql( sql, con=conn1 ) 

conn2 = pymssql.connect( server='34.64.110.64', database = 'ezchemtech' , user='sqlserver' , password = '!csdlwlof#1286' )
sql = 'select * from dbo.TB_Admin_1' 
df3 = pd.read_sql( sql, con=conn2 ) 

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
