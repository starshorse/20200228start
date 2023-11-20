from dotenv import load_dotenv 
import sys, os
import base64 
from datetime import datetime 

from codeFApi.ezch_token import request_token 
from codeFApi.ezch_certManger  import cert_manager 
from codeFApi.ezch_tax_register import tax_register 
from codeFApi.ezch_tax_list import tax_list 
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5
from codeFApi.db.tax_list import delete_taxList_m  , insert_sellIn_taxList , insert_sellOut_taxList, merge_sellIn_taxList , merge_sellOut_taxList  
from codeFApi.db.init_tables import get_serviceList_codeFApi , insert_service_log , update_service_log 
import pdb 

# ========== RSA Encrypt  ==========
def publicEncRSA(publicKey, data):
    keyDER = base64.b64decode(pubKey)
    keyPub = RSA.importKey(keyDER)
    cipher = Cipher_PKCS1_v1_5.new(keyPub)
    cipher_text = cipher.encrypt(data.encode())
    encryptedData = base64.b64encode(cipher_text).decode("utf-8")
    print('encryptedData = ' + encryptedData)
    return encryptedData
# ========== RSA Encrypt  ==========
BASE_DIR = os.path.dirname( os.path.abspath(__file__))
load_dotenv( os.path.join( BASE_DIR , "../../../../.env" )); 
client_id =  os.environ['CF_CLIENT_ID'] 
print( client_id )
client_secret = os.environ['CF_CLIENT_SECRET'] 
print( client_secret ) 
pubKey = os.environ['CF_PUBLIC_KEY'] 


def main_tax():
    rtn_result = {'STATUS': -1 , 'STATUS_1': {'SELLIN': -1 , 'SELLOUT': -1 }}
    result = get_serviceList_codeFApi() 
    for u in result: 
        # Get from DB. 
        if u._mapping['enabled'] == 0: 
            continue ;

        identity = u._mapping['사업자번호'] 
        cerPw = u._mapping['인증비번'] 
        id = u._mapping['인증분류코드'] 
        company = u._mapping['org_name'] 
        db_name = u._mapping['db_name'] 
        u_date  = u._mapping['인증년월'] 
        log_result = insert_service_log('전자세금계산서목록', company , '실패')
        print( log_result )
        # Seq. 
        insertedSeq = log_result[0][0]
        rtn_result['STATUS'] = -1 
        rtn_result['STATUS_1']['SELLOUT'] = -1 
        rtn_result['STATUS_1']['SELLIN'] = -1 

        token = request_token( client_id , client_secret )
        #print( token['TOKEN'] ) 
        #start loop.. 

        cert_data = cert_manager(u_date= u_date ,company=company,id=id); 

        delete_taxList_m( db_name = company ); 

        today = datetime.today() 
        print( today.month ) 
        this_month_first = datetime( today.year, today.month, 1 ) 
        iso_date_month_first = this_month_first.strftime('%Y%m%d') ;
        iso_today = today.strftime('%Y%m%d'); 

        codef_tax_list_body = {
            "organization": "0002",
            "loginType": "0",
            "certFile": cert_data['derFileB64'],
            "keyFile": cert_data['keyFileB64'],
            "certPassword": publicEncRSA( pubKey, cerPw ),
            "certType": "1",
            "manageNo": "",
            "managePassword": "",
            "inquiryType": "01",
            "searchType": "02",
            "startDate": iso_date_month_first,
            "endDate": iso_today,
            "sortby": "1",
            "orderBy": "0",
            "transeType": "02",
            "identity": identity,
            "type": "0"
        }
        # First sell in 
        result = tax_list( token['TOKEN'], codef_tax_list_body ) 
        if result['STATUS'] == 0:
            insert_sellIn_taxList( result['DATA'], company ) 
            merge_sellIn_taxList( db_name ) 
            rtn_result['STATUS_1']['SELLIN'] = 0 

        # Second sell out 
        codef_tax_list_body['transeType'] = '01' 
        result = tax_list( token['TOKEN'], codef_tax_list_body ) 
        if result['STATUS'] == 0:
            insert_sellOut_taxList( result['DATA'], company )
            merge_sellOut_taxList( db_name )
            rtn_result['STATUS_1']['SELLOUT'] = 0 
        print( rtn_result ) 
        rtn_result['STATUS'] = rtn_result['STATUS_1']['SELLIN'] + rtn_result['STATUS_1']['SELLOUT'] 
        if rtn_result['STATUS'] == 0:
            update_service_log( insertedSeq , '성공')
        else: 
            return rtn_result 
    return rtn_result 


if __name__=="__main__":
    main_tax();
