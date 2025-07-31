import subprocess
import schedule
import time
from send_g_naver_mail import send_mail 

def run_batch_and_log(batch_file_path, output_log_path):
    # 배치 파일 실행, stdout과 stderr를 캡처하여 output_log_path에 저장
    with open(output_log_path, 'w', encoding='utf-8') as log_file:
        # subprocess.run으로 배치 파일 실행, shell=True 필요 (윈도우)
        result = subprocess.run(batch_file_path, shell=True,
                                stdout=log_file,
                                stderr=subprocess.STDOUT,
                                text=True)
    return result.returncode

# 사용 예시
batch_file = r".\stock_daily.bat"
log_file = r".\stock_daily_log.txt"


def job():
    ret_code = run_batch_and_log(batch_file, log_file)
    print(f"배치 파일 실행 종료, 반환 코드: {ret_code}")
    print(f"실행 로그: {log_file}")
    send_mail(
            subject="daily Stock result",
            body="Log attached",
            to_addr_list=["starshorse@gmail.com", "star_horse@naver.com"],
            file_path=log_file,
            email_host="smtp.gmail.com",
            email_port=465,
            user="starshorse@gmail.com",
            app_password="ybgc evqf zyqe qjvp"
        )
# 매일 오전 10시 실행
schedule.every().day.at("10:00").do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
    
