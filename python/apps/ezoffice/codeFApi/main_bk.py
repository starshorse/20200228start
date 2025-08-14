from dotenv import load_dotenv 
import sys, os
import base64 
from datetime import datetime 
from ezch_token import request_token 
from ezch_connectedIDList import connected_id_list 
from ezch_add_account import account_add 
from ezch_accountList import account_list
from ezch_certManger  import cert_manager 
from bk.transaction_t1  import transaction_t1 , transaction_t1_foreign 
from bk.transaction_t2  import transaction_t2  
from db.init_tables import get_serviceList_codeFApi  
from db.account_list import insert_accountList, insert_accountTransaction , delete_accountTransaction_m, delete_accountList , get_accountList , merge_accountTr_kr , merge_accountTr_foreign  
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5
import pdb 

org_codes = { "산업은행": "0002","광주은행":"0034",
        "기업은행":"0003","제주은행":"0035",
        "국민은행":"0004","전북은행":"0037",
        "수협은행":"0007","경남은행":"0039",
        "농협은행":"0011","새마을금고":"0045",
        "우리은행":"0020","신협은행":"0048",
        "SC은행":"0023","우체국":"0071",
        "씨티은행":"0027","KEB하나은행":"0081",
        "대구은행":"0031","신한은행":"0088",
        "부산은행":"0032","K뱅크":"0089" }

ezct_accountList = ["국민은행","기업은행","신한은행","KEB하나은행","농협은행","우리은행"]

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
load_dotenv( os.path.join( BASE_DIR , "../../../.env" )); 

# print( os.environ )
client_id = '' ; 
client_secret = '' ; 

client_id =  os.environ['CF_CLIENT_ID'] 
print( client_id )
client_secret = os.environ['CF_CLIENT_SECRET'] 
print( client_secret ) 
pubKey = os.environ['CF_PUBLIC_KEY'] 

token = request_token( client_id , client_secret )
print( token['TOKEN'] ) 
result = connected_id_list( token['TOKEN'] ) 
print( result['DATA']['connectedIdList']);
connectedIdList =  result['DATA']['connectedIdList'];

cerPw =  os.environ['EZCT_BK_CER_PW']
cert_data = cert_manager(); 
print( cerPw )

KM_ORG_CODE = org_codes['국민은행'] 
WORI_ORG_CODE = org_codes['우리은행']

for bk_name in ezct_accountList:
    codef_account_add_body = {
                'connectedId': connectedIdList[0] ,    # connected_id
                'accountList':[
                    {
                        'countryCode':'KR',
                        'businessType':'BK',
                        'clientType':'B',
                        'organization': org_codes[bk_name],
                        'loginType':'0',
                        'password':publicEncRSA(pubKey, cerPw ),    # 인증서 비밀번호 입력
                        'derFile': cert_data['derFileB64'] ,                       # 인증서 인증서 DerFile
                        'keyFile': cert_data['keyFileB64']                         # 인증서 인증서 KeyFile
                    }
                ]
    }
    #temp  account_add( token['TOKEN'] , codef_account_add_body );

codef_account_list_body = {
    'connectedId':connectedIdList[0]
}
result = account_list( token['TOKEN'], codef_account_list_body );
if result['STATUS'] == 0:
    print( result['DATA']['accountList']);
    accountList =  result['DATA']['accountList'];

def update_accountList( token, db_name='ezchemtech' ):
    # bk account info.. 
    # BodyData
    #for [bk,code] in org_codes.items():
    result = {'STATUS': -1 } 
    for bk_name in ezct_accountList:
        print(bk_name);
        body = {
            'connectedId':connectedIdList[0],
            'organization': org_codes[bk_name]  
        }
        result = transaction_t2( token['TOKEN'], body )
        if result['STATUS'] == -1:
                break; 
        print( result )
        print( result['DATA']['resDepositTrust'] );
        print( result['DATA']['resForeignCurrency'] );
        delete_accountList( org_codes[bk_name] );
        ezct_accountList_code =  result['DATA']['resDepositTrust'] ;
        if len( ezct_accountList_code ) == 0:
            continue;
        insert_accountList( org_codes[bk_name] , ezct_accountList_code, db_name=db_name );   
        ezct_accountList_code =  result['DATA']['resForeignCurrency'] ;
        if len( ezct_accountList_code ) == 0:
            continue;
        insert_accountList( org_codes[bk_name] , ezct_accountList_code, db_name=db_name );   
    return result 


def update_accountTransaction_foreign( token, db_name='ezhemtech' ):
    result = {'STATUS': -1 } 
    account_id = {'KM':'63230104134613', 'WORI':'1005503989853'}
    today = datetime.today() 
    print( today.month ) 
    this_month_first = datetime( today.year, today.month, 1 ) 
    iso_date_month_first = this_month_first.strftime('%Y%m%d') ;
    iso_today = today.strftime('%Y%m%d'); 
    rows = get_accountList();
    #delete_accountTransaction_m(); 
#######################################################################################
# SQLAlchemy recoard ?  CORE , ORM으로 처리 가능 
#######################################################################################
    for u in rows.all():
        #print( u._mapping );
        if( u._mapping['resAccountDeposit'] == 20 ):
            # BodyData
            body = {
                'connectedId': connectedIdList[0],
                'organization': u._mapping['기관코드'],
                'account': u._mapping['resAccount'],
                'startDate': iso_date_month_first ,
                'endDate': iso_today ,
                'orderBy':'0',
                'inquiryType':'1',
                'currency': u._mapping['resAccountCurrency'] 
            }
            #result = transaction_t1( token['TOKEN'], body );
            result = transaction_t1_foreign( token['TOKEN'], body );
            if result['STATUS'] == -1:
                    break; 
            accountTransaction_data =  result['DATA']['resTrHistoryList']
            #print( result['DATA']['resTrHistoryList'])
            accountTransaction_data = list( accountTransaction_data ); 
            if len( accountTransaction_data ) == 0:
                continue 
            for x in accountTransaction_data:
                x['기관코드'] =  u._mapping['기관코드'] 
                x['resAccount'] = u._mapping['resAccount'] 
                x['accountList_seq'] = u._mapping['seq']
            print( accountTransaction_data );    
            # pdb.set_trace();
            insert_accountTransaction( accountTransaction_data, db_name=db_name )      
    return result         

def update_accountTransaction( token, db_name='ezchemtech' ):
    result = {'STATUS': -1 } 
    account_id = {'KM':'63230104134613', 'WORI':'1005503989853'}
    today = datetime.today() 
    print( today.month ) 
    this_month_first = datetime( today.year, today.month, 1 ) 
    iso_date_month_first = this_month_first.strftime('%Y%m%d') ;
    iso_today = today.strftime('%Y%m%d'); 
    rows = get_accountList();
    #delete_accountTransaction_m(); 
#######################################################################################
# SQLAlchemy recoard ?  CORE , ORM으로 처리 가능 
#######################################################################################
    for u in rows.all():
        #print( u._mapping );
        if( u._mapping['resAccountDeposit'] == 11 ):
            # BodyData
            body = {
                'connectedId': connectedIdList[0],
                'organization': u._mapping['기관코드'],
                'account': u._mapping['resAccount'],
                'startDate': iso_date_month_first ,
                'endDate': iso_today ,
                'orderBy':'0',
                'inquiryType':'1',
                #'currency': u._mapping['resAccountCurrency'] 
            }
            result = transaction_t1( token['TOKEN'], body );
            if result['STATUS'] == -1:
                    break; 
            #result = transaction_t1_foreign( token['TOKEN'], body );
            accountTransaction_data =  result['DATA']['resTrHistoryList']
            #print( result['DATA']['resTrHistoryList'])
            accountTransaction_data = list( accountTransaction_data ); 
            if len( accountTransaction_data ) == 0:
                continue 
#######################################################################################
# SQLAlchemy recoard ?  CORE , ORM으로 처리 가능 
#######################################################################################
            for x in accountTransaction_data:
                x['기관코드'] =  u._mapping['기관코드'] 
                x['resAccount'] = u._mapping['resAccount'] 
                x['accountList_seq'] = u._mapping['seq']
            print( accountTransaction_data );    
            # pdb.set_trace();
            insert_accountTransaction( accountTransaction_data, db_name=db_name )      
    return result        

if __name__=='__main__':
    rtn_result = {'STATUS': {'UPDATE_ACCOUNT': -1 , 'UPDATE_TR_KR': -1 , 'UPDATE_TR_FOR': -1 }}
    result = get_serviceList_codeFApi('계좌거래목록') 
#######################################################################################
# SQLAlchemy recoard ?  CORE , ORM으로 처리 가능 
#######################################################################################
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
        result = update_accountList( token,db_name = db_name );
        if result['STATUS'] == 0:
            delete_accountTransaction_m(db_name =db_name); 
            rtn_result['STATUS']['UPDATE_ACCOUNT'] = 0 
        result =  update_accountTransaction( token, db_name = db_name );
        if result['STATUS'] == 0:
            merge_accountTr_kr( db_name = db_name ); 
            rtn_result['STATUS']['UPDATE_TR_KR'] = 0 
        result = update_accountTransaction_foreign( token,db_name = db_name );
        if result['STATUS'] == 0:
            merge_accountTr_foreign( db_name =db_name ); 
            rtn_result['STATUS']['UPDATE_TR_FOR'] = 0 
    print( rtn_result ); 

