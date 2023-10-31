from flask import Flask, jsonify , render_template 
from flask import request 
from urllib import parse 
import json
import mk_get_list_by_id 
import pdb 

app = Flask( __name__ )

@app.route('/')
def getMl_key():
    result = {"RESULT":"failure", "ERORRMESSAGE": None , "DATA": None } 
    company_ = request.args.get('company') 
    id_ = request.args.get('id') 
    result["DATA"] = mk_get_list_by_id.get_ml_keys( company_, id_ )
    result["RESULT"] = "success" 
    return jsonify( result )

    
@app.route('/ui')
def getUi():
    company_name = request.args.get('company')
    id_ = request.cookies.get('user')
    id_ = parse.unquote( id_ )
    company_name_title = company_name.capitalize() 
#   pdb.set_trace()
#   ml_list , org_auth_key , org_auth_secret = mk_get_list_by_id.get_ml_keys( company_name ,"customer_01@demo.co.kr")
    ml_list , org_auth_key , org_auth_secret = mk_get_list_by_id.get_ml_keys( company_name , id_ )
    ml_list = json.loads( ml_list )
    print( ml_list )
    return render_template('Project(Asiafni)/program.html',companyName = company_name_title , toPass= ml_list , orgName = org_auth_key , orgAuthSecret = org_auth_secret ) 

#if __name__ == "__main__":
#    app.run( port = 5010 )
