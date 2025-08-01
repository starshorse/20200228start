import requests
import json 
import os 
from dotenv import load_dotenv 
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..','..','.env')

load_dotenv(dotenv_path)
# 이제 환경 변수 사용 가능
rest_api_key = os.getenv("REST_API_KEY")
print(rest_api_key)

def refresh_token():
    with open("res/kakao_message/kakao_token.json", "r") as fp:
        tokens = json.load(fp)

    url = "https://kauth.kakao.com/oauth/token"
    data = {
        "grant_type": "refresh_token",
        "client_id" : rest_api_key,
        "refresh_token": tokens["refresh_token"]
    }
    res = requests.post(url, data=data)
    new_tokens = res.json()
    print(new_tokens)

    # access_token만 갱신될 수도 있고, refresh_token도 갱신될 수 있음
    tokens['access_token'] = new_tokens['access_token']
    if 'refresh_token' in new_tokens:
        tokens['refresh_token'] = new_tokens['refresh_token']

    with open("res/kakao_message/kakao_token.json", "w") as fp:
        json.dump(tokens, fp)


if __name__=='__main__':
    refresh_token();
