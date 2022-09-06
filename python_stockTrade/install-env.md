32비트 파이썬을 venv 라이브러리 이용하여 64비트 윈도우에서 사용하기
================================================
```
C:\Users\user>mkdir VirtualEnv
C:\Users\user>python -m venv Py380_32
C:\Users\user>cd VirtualEnv
C:\Users\user\VirtualEnv>notepad Py380_32\pyvenv.cfg
```
가상 환경에서 사용할 디렉터리를 생성한다.
cd 명령으로 생성한 디렉터리로 이동한다. 
python -m venv Py380_32 명령 실행, -m 옵션은 라이브러리 모듈(venv)을 스크립트로 실행하라는 뜻이다. 
실행하면 Py380_32 디렉터리 밑에 pyvenv.cfg 설정 파일이 생성된다. 

노트패트로 pyvenv.cfg 설정 파일을 열어보면 기존 설치된 3.8.1 64비트 파이썬 정보가 적혀있다. 
설치 후 C:\Users\user\VirtualEnv\Py380_32\Scripts 경로에 가면 activate.bat 파일과 deactivate.bat 파일이 존재

해당 파일들은 가상화 모드를 활성화 비활성화하는 데 사용된다. 
C:\Users\user\VirtualEnv>Py380_32\Script\activate
위 명령을 통해서 가상 환경을 활성화 할 수 있다.
활성화 후 python --version 명령어를 실행하면 32비트 파이썬 버전이 표시된다.
pip install blockchain 명령으로 블록체인 라이브러리를 설치, 64비트 환경이 아닌 32비트에만 설치 되어진다. 
python 명령을 통해서 python.exe 인터프리터를 실행
블록체인 패키지의 익스체인지레이트 모튤 사용하여 비트코인의 15분전 KRW 시세를 출력

```python 
from blockchain import exchangerates 
tk = exchangerates.get_ticker()
print( '1 bitcoin =', tk['KRW'].p15min, 'KRW'_ 
'''
## 1) win32com 소개 및 설치 방법
### 1. Win32com(pywin32) 소개
Openpyxl과 대표적인 차이점이라면, Win32com을 사용했을 때 엑셀 실행 상태에서 제어가 가능하다라는 점을 들 수 있습니다. 
Openpyxl은 해당 엑셀파일을 실행하면 파이썬 코드에서 접근이 불가능합니다. 
Win32com 을 사용하여 엑셀을 제어하면 실행상태를 바로 볼 수 있어 편리해집니다.(실시간 확인 가능)
두번째는, 좀더 엑셀 기능적인 측면에서 접근할 수 있습니다. 쉽게 설명하자면 엑셀에서의 자동 줄채우기 기능, 복사 붙여넣기 등 
실제 엑셀 프로그램에서 사용하는 기능을 함수 하나로 대체하여 사용할 수 있습니다. 이 부분은 Openpyxl에는 없는 부분으로 차이가 있습니다. 

2. 설치방법
pip install pywin32
pip install --upgrade pywin32==225
