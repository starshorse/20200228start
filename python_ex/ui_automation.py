# 계산기 실행을 위해서 subprocess import
import subprocess

# 계산기 실행
subprocess.Popen('calc.exe')

# uiautomation을 auto로 import하기
import uiautomation as auto

# 계산기 창을 조작하기 위해서 계산기 창을 찾고 해당 객체값을 반환
calculator = auto.WindowControl(searchDepth=1, Name='계산기')

# 계산기 창이 확인될때까지 총 3초를 1초간격으로 확인하기
# 못찾을 경우 못찾았다는 메시지와 함께 종료
if not calculator.Exists(3, 1):
    print('Can not find Calculator window')
    exit(0)

# ButtonControl을 통한 calculator의 Button속성의 자식 중 1인 값을 찾아서 Click수행
calculator.ButtonControl(Name="1").Click()
