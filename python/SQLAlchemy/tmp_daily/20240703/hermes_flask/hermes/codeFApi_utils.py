from hermes.utils import  stringToBase64  
import requests, json 
import urllib
token_url = 'https://oauth.codef.io/oauth/token'


# ========== Toekn 재발급  ==========
def request_token_base(url, client_id, client_secret):
    authHeader = stringToBase64(client_id + ':' + client_secret).decode("utf-8")
    headers = {
                    'Acceppt': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + authHeader
    }
    response = requests.post(url, headers = headers, data = 'grant_type=client_credentials&scope=read')
    print(response.status_code)
    print(response.text)
    return response
# ========== Toekn 재발급  ==========
def request_token( client_id , client_secret):
    response_oauth = request_token_base(token_url, client_id, client_secret )
    if response_oauth.status_code == 200:
        dict = json.loads(response_oauth.text)
        # reissue_token
        token = dict['access_token']
        # print('access_token = ' + token)
        return {'STATUS': 0 ,'TOKEN': token ,'ERRORMESSAGE':'' }
    else:
        # print('토큰발급 오류')
        return {'STATUS': -1, 'ERRORMESSAGE':'토큰발급 오류'}
