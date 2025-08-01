import json
import requests
from kakao_token import load_tokens ,KAKAO_TOKEN_FILENAME 
from kakao_token_update import refresh_token
import pandas as pd 


# 데이터 준비
df = pd.DataFrame({
    'seq': [1, 2],
    '종목코드': ['005930', '035720'],
    '종목명': ['삼성전자', '카카오'],
    '시가총액': [6000000, 4000000],
    'PER': [12.5, 20.1],
    'RBR': [1.2, 1.5],
    '배당금': [1500, 500],
    '시가배당율': [2.5, 1.2],
    '부채비율': [40, 60],
    '시장': ['코스피', '코스닥'],
})
# DataFrame을 string으로 변환 (필요에 따라 포맷 조정)
msg = df.to_string(index=False)

refresh_token();
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
                                     "text" : msg ,
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
