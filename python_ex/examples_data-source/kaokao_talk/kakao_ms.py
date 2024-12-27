
import requests
url = "https://kauth.kakao.com/oauth/token"
data = {
    "grant_type" : "authorization_code",
    "client_id" : "ae744b82782223089df92b9c4e5a33de",
    "redirect_uri" : "https://localhost.com",
    "code" : "u23MR7eC33qelMFWneD8UreaLyz93_v7UgVaEUNUYX4r2XcaNXW2hJm7VUUKPXRoAAABjFNPwrzo6jj-qNQmaA"
}
response = requests.post(url, data=data)
# 요청에 실패했다면,
if response.status_code != 200:
    print("error! because ", response.json())
else: # 성공했다면,
    tokens = response.json()
    print(tokens)
