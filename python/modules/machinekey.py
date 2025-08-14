import jwt 

org_name=''
HADES_1_KEY ='' 
id =''
type = '' 
ml_key_info = {}

def setHADES_1_KEY( key ):
    global HADES_1_KEY 
    HADES_1_KEY = key 

def setCompany( org ):
    global org_name  
    org_name = org 

def setId( id_ ):
    global id ;
    id = id_;
  
def setType( type_ ):    
    global type ;
    type = type_;

def jwt_encode( ml_key_info, HADES_1_KEY ):
    return jwt.encode( ml_key_info, HADES_1_KEY, 'HS256' )
    
def jwt_decode( encode_jwt, HADES_1_KEY ):
    return jwt.decode( encode_jwt, HADES_1_KEY, 'HS256' )
