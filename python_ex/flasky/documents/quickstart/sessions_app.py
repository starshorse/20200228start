from flask import Flask 
from flask import redirect, url_for  
from flask import request , session 

app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
"""
How to generate good secret keys
A secret key should be as random as possible. Your operating system has ways to generate pretty random data based on a cryptographic random generator. Use the following command to quickly generate a value for Flask.secret_key (or SECRET_KEY):
$ python -c 'import secrets; print(secrets.token_hex())'
'192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf'
"""

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as { session["username"] }'
    return 'You are not logged in' 

@app.route('/login', methods=['GET','POST']) 
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect( url_for('index')) 
    return '''
    <form method="post">
        <p><input type=text name=username>
        <p><input type=submit value=Login>
    </form>
    '''

@app.route('/logout')
def logout():
    session.pop('username', None )
    return redirect( url_for('index')) 


if __name__ == '__main__':
    app.run( host='0.0.0.0', port=5000) 
