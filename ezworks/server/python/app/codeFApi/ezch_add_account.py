import requests, json, base64
import urllib
from codeFApi.ezch_connectedIDList import http_sender 

#############################################################################
##                               계정 추가 Sample                             ##
##############################################################################
# Input Param
#
# connectedId : CODEF 연결아이디
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
print('=============================== 계정추가 ===============================')
codef_account_add_url = 'https://development.codef.io/v1/account/add'
def account_add( token, codef_account_add_body ):
    response_account_add = http_sender(codef_account_add_url, token, codef_account_add_body)
    if response_account_add.status_code == 200:        # token error
        print('계정추가 정상처리')
    elif response_account_add.status_code == 401:      # token error
        dict = json.loads(response_account_add.text)
        # invalid_token
        print('error = ' + dict['error'])
        # Cannot convert access token to JSON
        print('error_description = ' + dict['error_description'])
        print('토크 오류') 
    else:
        print('계정추가 정상처리')
