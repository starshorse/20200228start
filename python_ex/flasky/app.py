# 1. A minimal Application
#   $flask --app hello run 
# Externally Visible Server:
#   $flask run --host=0.0.0.0 
# Debug 
#   $flask --app hello --debug run 
# HTML Escaping.. 
#   '<script>alert("bad")</script
# set FLASK_APP=main.py
#
# 2. SocketIO
#    pip install flask-socketio

from flask import Flask 
from flask_socketio import SocketIO

app = Flask( __name__ ) 
app.config['SECRET_KEY'] = 'ez-office.co.kr' 
socketio = SocketIO(app) 


@app.route('/')
def hello():
    return 'Hello, World'

if __name__ == '__main__':
    #  app.run( port = 5000 )
    socketio.run( app, debug=True )
