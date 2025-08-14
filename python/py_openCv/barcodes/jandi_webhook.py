#views.py

import requests 
from datetime import datetime 


def send_jandi(event_message, type_num = 0 ):
    now = datetime.now() 
    date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
    """
    url = "http://" + request.get_host() + reverse('detail', args=[post.pk])
    """
    url ="http://ezoffice365.com" 
    title ="Event:{}".format(event_message)
    body ="Test from openCV: {}".format( date_time ) 
    print(body)
    payload = '{{"body":"{}","connectColor":"#6C639C","connectInfo":[{{"title":"{}","imageUrl":"{}"}}]}}'.format( body, title, url ) 

    headers = {'Accept': 'application/vnd.tosslab.jandi-v2+json',
    'Content-Type': 'application/json'}
    if type_num == 0:
        r = requests.post("https://wh.jandi.com/connect-api/webhook/22986542/a7822794466fe972ff9d517afd999da8", data=payload.encode('utf-8'), headers=headers)
    elif type_num == 1:  
        r = requests.post("https://wh.jandi.com/connect-api/webhook/22986542/fcb71b0790db8ad1cdb59831a4013944", data=payload.encode('utf-8'), headers=headers)


if __name__=="__main__":
    message ="Office light [ON]" 
    send_jandi(message, 1 )
