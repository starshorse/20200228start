from flask import Flask, jsonify , render_template 
from flask import request 
import mk_get_list_by_id 

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
    return render_template('./Project(Asiafni)/program.html') 
