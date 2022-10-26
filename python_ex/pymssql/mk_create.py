import pymssql 
import jwt 
import pandas as pd 

ezchemtech_ml_key = { company:'ezchemtech' , source:'excel', id:'richard.choi@ez-office.co.kr' , type: 'Machine' } 
HADES_1_KEY = 'ez-office.co.kr'

encode_jwt =  jwt.encode( ezchemtech_ml_key , HADES_1_KEY ) 
print('encode key', encode_jwt ) 

decode_ml_key = jwt.decode( encode_jwt , HADES_1_KEY )
print( ezchemtech_ml_key , decode_ml_key ) 
