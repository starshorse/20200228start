# -*- coding: utf-8 -*-
# UTF-8 encoding when using korean
#######################################
##      ConnectedId 목록조회
######################################
import requests, json, base64
import urllib

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_PKCS1_v1_5

# ========== HTTP 기본 함수 ==========
def http_sender(url, token, body):
    headers = {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        }

    response = requests.post(url, headers = headers, data = urllib.parse.quote(str(json.dumps(body))))

    print('response.status_code = ' + str(response.status_code))
    print('response.text = ' + urllib.parse.unquote_plus(response.text))

    return response
# ========== HTTP 함수  ==========
# 기 발급된 토큰
token =''
##############################################################################
##                               ConnectedId 목록조회                         ##
##############################################################################
# Input Param
#
# pageNo : 페이지 번호(생략 가능) 생략시 1페이지 값(0) 자동 설정
#
##############################################################################
codef_connected_id_list_url = 'https://development.codef.io/v1/account/connectedId-list'
codef_connected_id_list_body = {
    'pageNo':'5'            # 페이지 번호(생략 가능) 생략시 1페이지 값(0) 자동 설정
}

def connected_id_list( token ):
    result = { 'STATUS': -1, 'ERRORMESSAGE':'', 'DATA': '' }
    response_connected_id_list = http_sender(codef_connected_id_list_url, token, codef_connected_id_list_body)
    if response_connected_id_list.status_code == 200:      # success
        # dict = json.loads(urllib.unquote_plus(response_connected_id_list.text.encode('utf8')))
        dict = json.loads((urllib.parse.unquote_plus(response_connected_id_list.text, encoding='utf-8')).encode('utf8'))
        if 'data' in dict and str(dict['data']) != '{}':
            print('조회 정상 처리');
            result['STATUS'] = 0 ;
            result['DATA'] = dict['data'] ;
            return  result;
        else:
            print('조회 오류')
            result['ERRORMESSAGE'] = '조회 오류';
            return  result; 
    elif response_connected_id_list.status_code == 401:      # token error
        dict = json.loads(response_connected_id_list.text)
        # invalid_token
        print('error = ' + dict['error'])
        # Cannot convert access token to JSON
        print('error_description = ' + dict['error_description'])
        result['ERRORMESSAGE'] = 'Token 오류';
        return  result; 
    else:
        print('조회 오류')
        result['ERRORMESSAGE'] = '조회 오류';
        return  result; 
