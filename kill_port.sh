#!/bin/bash
# 관리자모드에서 git-bash를 실행하시요 

if [ -z "$1" ]; then
  echo "사용법: $0 <포트번호>"
  exit 1
fi

PORT=$1

# 포트를 사용 중인 프로세스 ID(PID) 찾기
PID=$(netstat -ano | grep ":$PORT " | awk '{print $5}' | tail -n1)

if [ -z "$PID" ]; then
  echo "포트 $PORT 을(를) 사용하는 프로세스가 없습니다."
  exit 0
fi

echo "포트 $PORT 을(를) 사용하는 프로세스 PID: $PID"

# 프로세스 종료 시도
taskkill //PID $PID //F

if [ $? -eq 0 ]; then
  echo "프로세스 $PID 가 정상 종료되었습니다."
else
  echo "프로세스 종료에 실패했습니다."
fi


