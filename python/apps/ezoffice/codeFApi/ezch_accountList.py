##############################################################################
##                               계정 목록 Sample                             ##
##############################################################################
# Input Param
#
# accountList : 계정목록
#   countryCode : 국가코드
#   businessType : 비즈니스 구분
#   clientType : 고객구분(P: 개인, B: 기업)
#   organization : 기관코드
#   loginType : 로그인타입 (0: 인증서, 1: ID/PW)
#   password : 인증서 비밀번호
#   derFile : 인증서 derFile
#   keyFile : 인증서 keyFile
#
##############################################################################
from ezch_connectedIDList import http_sender
import json , urllib 
print('=============================== 계정목록 ===============================')


codef_account_list_url = 'https://development.codef.io/v1/account/list'

def account_list( token , codef_account_list_body ):
    result = { 'STATUS': -1, 'ERRORMESSAGE':'', 'DATA': '' }
    response_account_list = http_sender(codef_account_list_url, token, codef_account_list_body)
    if response_account_list.status_code == 200:      # success
        dict = json.loads((urllib.parse.unquote_plus(response_account_list.text, encoding='utf-8' )).encode('utf8'))
        #print(urllib.unquote_plus(response_account_list.text.encode('utf8')))
        if 'data' in dict and str(dict['data']) != '{}':
            print('조회 정상 처리')
            result['STATUS'] = 0 ;
            result['DATA'] = dict['data'] ;
            return result; 
        else:
            print('조회 오류')
            result['ERRORMESSAGE'] = '조회 오류';
            return  result; 
    elif response_account_list.status_code == 401:      # token error
        dict = json.loads(response_account_list.text)
        # invalid_token
        print('error = ' + dict['error'])
        # Cannot convert access token to JSON
        print('error_description = ' + dict['error_description'])
        print('토큰 오류');
        result['ERRORMESSAGE'] = 'Token 오류';
        return  result; 
    else:
        print('조회 오류')
        result['ERRORMESSAGE'] = '조회 오류';
        return  result; 
