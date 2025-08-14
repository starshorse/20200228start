#
# http://localhost:5000/?company=demo&id=customer_01@demo.co.kr
#

from flask import Flask 
from flask import request 

app = Flask( __name__ ) 
@app.route('/')
def main():
    company = request.args.get('company')
    id = request.args.get('id') 
    req_ = f"company is { company }, id is { id }" 
    print( req_ )
    return req_  


