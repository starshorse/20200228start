from flask import Flask, render_template, request , url_for , redirect, flash  
#from flask_bootstrap import Bootstrap 
from flask_moment import Moment 
from flask_cors import CORS
from datetime import datetime 
from werkzeug.utils import secure_filename
import pdb
import os 
from file_op import getPath_upload 
from db.init_tables import update_table_service_info

app = Flask(__name__)
#bootstrap = Bootstrap(app) 
moment = Moment( app )
#pdb.set_trace();
#moment.include_moment() 
CORS(app)

UPLOAD_FOLDER =  os.path.join( os.path.dirname(__file__),'uploads' );
ALLOWED_EXTENSIONS = { 'der' ,'key'}

app.config['SECRET_KEY'] = 'ez-office.co.kr' 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def allowed_file( filename ):
    return '.' in filename and \
            filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

def get_Date_yM():
    return datetime.now().strftime('%Y-%m')

@app.route('/')
def index():
    return 'Web App with Python Flask!'
@app.route('/bootstrap')
def bootstrap():
    return render_template('angularJs_1.html', current_time = datetime.utcnow() ) 

@app.route('/upload_file/<id>', methods=['GET','POST'])
def upload_file(id):
    if request.method == 'POST':
        #pdb.set_trace();
        files = request.files.getlist("file[]") 
        user_DB = request.cookies.get('user_DB') 
        print( request.form ) 
        auth_pass = request.form['password'] 
        buz_num = request.form['buz_num'] 
        for file in files:
            if file.filename == '':
                flash('No selected file')
                return redirect(f'/bootstrap#!/auth_upload/{id}') 
            if file and allowed_file( file.filename ): 
                filename = secure_filename( file.filename ) 
                cur_date = get_Date_yM();
                upload_path  = getPath_upload( user_DB , id , cur_date ); 
                print( upload_path ); 
                print( UPLOAD_FOLDER );
                print( filename );
                update_table_service_info( user_DB , id , cur_date , auth_pass , buz_num ) 
                file.save(os.path.join( upload_path , filename )) 
                flash('file load Ok') 
    return redirect(f'/bootstrap#!/auth_upload/{id}') 

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
