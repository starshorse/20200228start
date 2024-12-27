import json
import requests
from kakao_token import load_tokens ,KAKAO_TOKEN_FILENAME 

# 저장된 토큰 정보를 읽어 옴
tokens = load_tokens(KAKAO_TOKEN_FILENAME)

# 텍스트 메시지 url
url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"

# request parameter 설정
headers = {
    "Authorization": "Bearer " + tokens['access_token']
}


data = {
    "template_object" : json.dumps({ "object_type" : "text",
                                     "text" : "Hello, world!",
                                     "link" : {
                                         "web_url" : "www.naver.com"
                                     }
                                     })
}

# 나에게 카카오톡 메시지 보내기 요청 (text)
response = requests.post(url, headers=headers, data=data)
print(response.status_code)

# 요청에 실패했다면,
if response.status_code != 200:
    print("error! because ", response.json())
else: # 성공했다면,
    print('메시지를 성공적으로 보냈습니다.')