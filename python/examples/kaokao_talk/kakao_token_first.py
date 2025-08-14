"""
인가코드받기 
https://kauth.kakao.com/oauth/authorize?client_id=<< rest_api_key >>&redirect_uri=https://localhost.com&response_type=code&scope=talk_message
"""
import requests
import json 

import os 
from dotenv import load_dotenv 
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..','..','.env')

load_dotenv(dotenv_path)
# 이제 환경 변수 사용 가능
rest_api_key = os.getenv("REST_API_KEY")
print(rest_api_key)

url = "https://kauth.kakao.com/oauth/token"
data = {
    "grant_type" : "authorization_code",
    "client_id" : rest_api_key ,
    "redirect_uri" : "https://localhost.com",
    "code" : "TfO0v9ZQ6Xj85IlpVADef0sZsjeq1iySYWMpV2qVRtYeEQ9zYEFHpwAAAAQKFxZiAAABmGQfLIFHueF-5ScOZw"
}
response = requests.post(url, data=data)
# 요청에 실패했다면,
if response.status_code != 200:
    print("error! because ", response.json())
else: # 성공했다면,
    tokens = response.json()
    print(tokens)

# 토큰 파일 저장
with open("res/kakao_message/kakao_token.json", "w") as fp:
    json.dump(tokens, fp)    
