# A minimal Application
#   $flask --app hello run 
# Externally Visible Server:
#   $flask run --host=0.0.0.0 
# Debug 
#   $flask --app hello --debug run 
# HTML Escaping.. 
#   '<script>alert("bad")</script

import pdb 
from flask import Flask 
from markupsafe import escape 

app = Flask(__name__)

@app.route("/")
def hello_world():
#    pdb.set_trace(); 
    return "<p>Hello, World!</p>"

@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"
