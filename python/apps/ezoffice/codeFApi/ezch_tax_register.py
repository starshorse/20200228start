# -*- coding: utf-8 -*-
# UTF-8 encoding when using korean
#######################################
##     Tax  register  
######################################
import requests, json, base64
import urllib

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

codef_tax_register_url = 'https://development.codef.io/v1/kr/public/a/pop-bill/tax-cert-url'

def tax_register( token , codef_tax_register_body ):
    result = { 'STATUS': -1, 'ERRORMESSAGE':'', 'DATA': '' }
    response_tax_register = http_sender(codef_tax_register_url, token, codef_tax_register_body)
    if response_tax_register.status_code == 200:      # success
        dict = json.loads((urllib.parse.unquote_plus(response_tax_register.text, encoding='utf-8')).encode('utf8'))
        if 'data' in dict and str(dict['data']) != '{}':
            print('조회 정상 처리');
            result['STATUS'] = 0 ;
            result['DATA'] = dict['data'] ;
            return  result;
        else:
            print('조회 오류')
            result['ERRORMESSAGE'] = '조회 오류';
            return  result; 
    elif response_tax_register.status_code == 401:      # token error
        dict = json.loads(response_tax_register.text)
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
