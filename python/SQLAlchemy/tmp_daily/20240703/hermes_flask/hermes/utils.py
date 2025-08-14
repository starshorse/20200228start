import requests , base64 ,json
"""
from Crypto.PublicKey import RSA 
from Crypto.Cipher import PKCS1_V1_5 as Cipher_PKCS1_v1_5 
"""
def stringToBase64(s):
    return base64.b64encode( s.encode('utf-8')) 

def base64ToString(b):
    return base64.b64decode(b).decode('utf-8')

"""
def publicEncRSA( pubkey, data ):
    keyDER = base64ToString( pubkey )
    keyPub = RSA.importKey( keyDER ) 
    cipher = Cipher_PKCS1_v1_5.new( keyPub ) 
    cipher_text = cipher.encrypt( data.encode() )
    encryptedData = stringToBase64( cipher_text ).decode('utf-8')
    print('encryptedData = ' + encryptedData )
    return encryptedData 
"""    

def http_sender( url, token , body ):
    headers = {'Content-Type':'application/json' , 'Authorization':'Bearer ' + token } 
    response = requests.post( url , headers = headers , data = urllib.parse.quote( str( json.dumps( body )))) 
    print('response.status_code = ' + str(response.status_code )) 
    print('response.text = ' + urllib.parse.unquote_plus( response.text)) 
    return response 
