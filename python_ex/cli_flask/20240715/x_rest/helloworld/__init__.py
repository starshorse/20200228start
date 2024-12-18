from flask import Flask , g , Response ,make_response 
from flask_restx import fields , Resource , Namespace ,Api
from helloworld.ns_Hello import namespace as hello_ns 
from helloworld.ns_Todo import Todo as todo_ns 
from .ns_cats import api  as cats_ns 
from .pykrx_api import bp_pykrx 

app = Flask(__name__)
app.register_blueprint( bp_pykrx ); 


api = Api( app ) 

api.add_namespace( hello_ns ,'/hello' )
api.add_namespace( cats_ns  ,'/cats') 
api.add_namespace( todo_ns  ,'/todo') 



