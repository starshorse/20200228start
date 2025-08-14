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
    sql = 'SELECT a.담당자1, a.업무명, b.세부내용, a.완료시한, a.완료일 from TB_정기업무수행대상목록 a inner join  TB_정기업무기본정보 b on a.업무id = b.seq  WHERE YEAR(a.완료시한) = YEAR(GETDATE()) AND MONTH(a.완료시한) = MONTH(GETDATE());'
    sqls.append( sql )
    prs.job_sql_schedule( sqls ) 






