##############################################################################
##                               Tax 목록 Sample                             ##
##############################################################################
# Input Param
#
# tax_list : Tax목록
#   organization : 기관코드 ( 0002 )
#   loginType : 로그인타입 (0: 인증서, 1: ID/PW)
#   inquiryType : "01":  "01" : 전자세금계산서, "02" : 위수탁 전자세금계산서, "03" : 전자계산서, "04" : 위수탁 전자계산서
#   password : 인증서 비밀번호
#   derFile : 인증서 derFile
#   keyFile : 인증서 keyFile
#   certType : "1" ( der/key ) , "pfx" pfx 
#   startDate : YYYYMMDD
#   endDate : YYYYMMDD
#   sortby : "1" : 작성일자, "2" : 승인번호, "3" : 발급일자, "4" : 전송일자, "5" : 사업자등록번호, "6" : 상호, "7" : 대표자명, "8" : 합계금액, "9" : 공급가액, "10" : 세액
#
##############################################################################
from ezch_connectedIDList import http_sender
import json , urllib 
print('=============================== 계정목록 ===============================')


codef_tax_list_url = 'https://development.codef.io/v1/kr/public/nt/tax-invoice/check-list'

def tax_list( token , codef_tax_list_body ):
    result = { 'STATUS': -1, 'ERRORMESSAGE':'', 'DATA': '' }
    response_tax_list = http_sender(codef_tax_list_url, token, codef_tax_list_body)
    if response_tax_list.status_code == 200:      # success
        dict = json.loads((urllib.parse.unquote_plus(response_tax_list.text, encoding='utf-8' )).encode('utf8'))
        #print(urllib.unquote_plus(response_tax_list.text.encode('utf8')))
        if 'data' in dict and str(dict['data']) != '{}':
            print('조회 정상 처리')
            result['STATUS'] = 0 ;
            result['DATA'] = dict['data'] ;
            return result; 
        else:
            print('조회 오류')
            result['ERRORMESSAGE'] = '조회 오류';
            return  result; 
    elif response_tax_list.status_code == 401:      # token error
        dict = json.loads(response_tax_list.text)
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
