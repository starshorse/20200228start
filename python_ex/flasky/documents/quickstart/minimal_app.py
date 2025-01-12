from flask import Flask 
from flask import abort , redirect , url_for 
from flask import render_template  

app = Flask(__name__)

"""
  routing 
  URL Building : url_for   
  with app.test_request_context 
  HTTP Methods : request . 
"""

@app.route("/")
def index():
    return 'index' 

@app.route("/home")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login")
def login():
    return redirect(url_for('hello_world')) 

@app.route('/user/<username>')
def profile(username):
    return f'{ username }\'s profile' 

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404 

with app.test_request_context():
    print(url_for('hello_world'))
    print(url_for('login'))
    # print(url_for('home', next='/' ))
    print(url_for('profile', username='John Doe'))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

