import sys, os 
from dotenv import load_dotenv
from pathlib import Path 
dotenv_path = Path('../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 
sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import period_run_sql as prs 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

if __name__ == '__main__':
    sqls = []
    prs.set_db_info( sqlserver_host , sqlserver_id , sqlserver_password )
    sql = "select a.계좌번호, b.잔액, a.거래일시, b.적요 FROM ( select Max(seq) as seq, 계좌번호, Max(거래일시) as 거래일시  FROM TB_계좌거래내역_chem group by 계좌번호  )  a  left join TB_계좌거래내역_chem b on  a.seq = b.seq;"
    sqls.append( sql ) 
    sql = "select FORMAT( sum(잔액),'c','ko-KR') as  Total from ( select a.계좌번호, b.잔액, a.거래일시, b.적요 FROM ( select Max(seq) as seq, 계좌번호, Max(거래일시) as 거래일시  FROM TB_계좌거래내역_chem group by 계좌번호  )  a  left join TB_계좌거래내역_chem b on  a.seq = b.seq) a;"
    sqls.append( sql ) 
    prs.job_sql_schedule( sqls ) 

    



