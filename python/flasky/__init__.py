from flask import Flask, render_template 
from flask_bootstrap import Bootstrap 
from flask_mail import Mail
from flask_moment import Moment 
#from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager 
from flask_pagedown import PageDown 
# from config import config 
# from flask_sslify import SSLify 
from .simple_page import simple_page as simple_page_blueprint 

def create_app( config_name = 'default'):
    app = Flask(__name__)
    bootstrap.init_app(app)

    #app.register_blueprint( simple_page_blueprint )
    app.register_blueprint(simple_page_blueprint, url_prefix='/pages')

    @app.route('/')
    def hello():
        return render_template('index.html');

    return app 

bootstrap = Bootstrap();
