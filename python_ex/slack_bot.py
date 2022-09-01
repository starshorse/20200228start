import requests
from datetime import datetime


# slack 챗 봇
def post_message(token, channel, text):
    response = requests.post("https://slack.com/api/chat.postMessage",
                             headers={"Authorization": "Bearer " + token},
                             data={"channel": channel, "text": text})
    print(response)


# slack 토큰
#myToken = "xoxb-123456789011-123456789-ABCDEFGHIJKLMNOP"
myToken = "xoxb-4037049818752-4016573313796-5wn7fv6BZSrX1xHR5ks3shyC"

# message로 받은 인자를 파이썬 쉘과 슬랙 #채널이름 에 동시에 출력한다
def dbgout(message):
    print(datetime.now().strftime('[%m/%d %H:%M:%S]'), message)
    strbuf = datetime.now().strftime('[%m/%d %H:%M:%S] ') + message
    post_message(myToken, "#stock_alarm01", strbuf)

   
dbgout("Hello World")   
