from flask import Flask, jsonify , render_template , request, url_for , redirect , flash  
from flask_moment import Moment 
from flask_cors import CORS
from datetime import datetime 
from werkzeug.utils import secure_filename
import json 
from urllib import parse 
from codeFApi.main_tax import main_tax  
from codeFApi.main_bk  import main_bk 
from codeFApi.file_op import getPath_upload 
from codeFApi.db.init_tables import update_table_service_info
from ml_key_checker.mk_get_list_by_id import get_ml_keys 
import pdb 
import asyncio

app = Flask(__name__) 
moment = Moment( app )
CORS(app)


ALLOWED_EXTENSIONS = { 'der' ,'key'}

app.config['SECRET_KEY'] = 'ez-office.co.kr' 
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
def allowed_file( filename ):
    return '.' in filename and \
            filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

def get_Date_yM():
    return datetime.now().strftime('%Y-%m')

@app.route('/')
def getMl_key():
    result = {"RESULT":"failure", "ERORRMESSAGE": None , "DATA": None } 
    company_ = request.args.get('company') 
    id_ = request.args.get('id') 
    result["DATA"] = get_ml_keys( company_, id_ )
    result["RESULT"] = "success" 
    return jsonify( result )

@app.route('/ui')
def getUi():
    company_name = request.args.get('company')
    id_ = request.cookies.get('user')
    id_ = parse.unquote( id_ )
    company_name_title = company_name.capitalize() 
#   pdb.set_trace()
    ml_list , org_auth_key , org_auth_secret = get_ml_keys( company_name , id_ )
    ml_list = json.loads( ml_list )
    print( ml_list )
    return render_template('Project(Asiafni)/program.html',companyName = company_name_title , toPass= ml_list , orgName = org_auth_key , orgAuthSecret = org_auth_secret ) 

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

@app.route('/service/<name>')
def index(name):
    if name == '전자세금계산서목록':
        main_tax();
    elif name == '계좌거래목록':
        main_bk();
    return '<h1>Service %s Start</h1>' % name 

if __name__=='__main__':
    main_tax()
    """
    #asyncio.run( main_tax() );
    loop = asyncio.get_event_loop()
    loop.run_until_complete( asyncio.wait([ main_tax() ]))
    """
    #main_bk();
    app.run( debug = True , port = 5010 )

