# -*- coding: utf-8 -*-
# UTF-8 encoding when using korean

######################################
##      은행 법인 보유계좌
######################################

import sys, os 
BASE_DIR = os.path.dirname( os.path.abspath(__file__))
sys.path.append( os.path.join( BASE_DIR, '../'))
import requests, json, base64
import urllib
from ezch_connectedIDList import http_sender


# CodefURL
codef_url = 'https://development.codef.io'
token_url = 'https://oauth.codef.io/oauth/token'

# 은행 법인 보유계좌
account_list_path = '/v1/kr/bank/b/account/account-list'

# 기 발급된 토큰
token =''


def transaction_t2( token, body ):
    result = { 'STATUS': -1, 'ERRORMESSAGE':'', 'DATA': '' }
    # CODEF API 요청
    response_codef_api = http_sender(codef_url + account_list_path, token, body)

    if response_codef_api.status_code == 200:
        dict = json.loads(urllib.parse.unquote_plus(response_codef_api.text))
        print(urllib.parse.unquote_plus(response_codef_api.text))
        if 'data' in dict and str(dict['data']) != '{}':
            print('조회 정상 처리')
            result['STATUS'] = 0 ;
            result['DATA'] = dict['data'] ;
            return result; 
        else:
            print('조회 오류')
            result['ERRORMESSAGE'] = '조회 오류';
            return  result; 
    # token error
    elif response_codef_api.status_code == 401:
        dict = json.loads(response_codef_api.text)
        # invalid_token
        print('error = ' + dict['error'])
        # Cannot convert access token to JSON
        print('error_description = ' + dict['error_description'])
        print('Toke Eror');
        result['ERRORMESSAGE'] = 'Token 오류';
        return  result; 

    else:
        print('조회 오류')
        result['ERRORMESSAGE'] = '조회 오류';
        return  result; 
