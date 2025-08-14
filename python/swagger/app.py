import flask
from flask_restx import Api

def create_app():
    app = flask.Flask(__name__)
    api = Api()
    api.init_app(app)
    return app

app = create_app()
