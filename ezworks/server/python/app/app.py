from flask import Flask 
from codeFApi.main_tax import main_tax  
from codeFApi.main_bk  import main_bk 

app = Flask(__name__) 

@app.route('/service/<name>')
def index(name):
    if name == '전자세금계산서목록':
        main_tax();
    elif name == '계좌거래목록':
        main_bk();
    return '<h1>Service %s Start</h1>' % name 

if __name__=='__main__':
    main_tax();
    main_bk();
    app.run( debug = True , port = 5010 )

