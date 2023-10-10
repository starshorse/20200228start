import schedule
import datetime 
import time 

def schedule_every_x_hours( job , hours = 1 ):
    schedule.every( hours ).hours.do( job ) 
    while True:
        schedule.run_pending()
        time.sleep(1) 
       
def message():
    print("스케줄 실행중...")
    print("cur time:", datetime.datetime.now())


if __name__ == '__main__':
    schedule_every_x_hours( message ); 
    
