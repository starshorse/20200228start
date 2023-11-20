from flask import Flask, render_template, flash , request , redirect, url_for  
from flask_moment import Moment 
from flask_cors import CORS
from datetime import datetime 
from werkzeug.utils import secure_filename
import pdb
import os 

app = Flask(__name__)
moment = Moment( app )
CORS(app)
app.secret_key= "ez-office.co.kr"
app.config['SESSION_TYPE'] = 'filesystem'

UPLOAD_FOLDER =  os.path.join( os.path.dirname(__file__),'uploads' );
ALLOWED_EXTENSIONS = { 'txt' ,'pdf' ,'png' ,'jpg', 'jpeg', 'gif' }

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def allowed_file( filename ):
    return '.' in filename and \
            filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return 'Web App with Python Flask!'
@app.route('/upload_file', methods=['GET','POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part') 
            return redirect( request.url )
        file = request.files['file'] 
        if file.filename == '':
            flash('No selected file')
            return redirect( request.url ) 
        if file and allowed_file( file.filename ): 
            filename = secure_filename( file.filename ) 
            file.save( os.path.join( app.config['UPLOAD_FOLDER'], filename )) 
            #return redirect( url_for('download_file', name= filename ))
    return '''
    <! doctype html >
    <title> Upload new File</title> 
    <h1>Upload new File</h1>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
    '''
if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
