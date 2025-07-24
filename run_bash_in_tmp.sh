#!/bin/bash


#아래는 bash 스크립트에서 인자로 받은 파일을 상위 디렉토리로 이동해서 tmp 디렉토리를 만들고, 파일을 복사한 뒤 수행하는 예시입니다.
# i.e
# bash run_bash_in_tmp.sh ./test_automation/zombie/setup_zombie_test.sh 


#------------------------------------------
# 🧾 1. 인자 체크
#------------------------------------------
if [ $# -eq 0 ]; then
    echo "Usage: $0 <path-to-bash-script>"
    exit 1
fi

#------------------------------------------
# 📥 2. 인자로 받은 파일 처리
#------------------------------------------
INPUT_FILE="$1"

# 파일 존재하는지 확인
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: '$INPUT_FILE' is not a valid file."
    exit 1
fi

# 절대 경로 추출
ABS_FILE_PATH=$(readlink -f "$INPUT_FILE")
FILE_NAME=$(basename "$ABS_FILE_PATH")

#------------------------------------------
# 📁 3. 현재 디렉토리 기준 상위 디렉토리 추출
#------------------------------------------
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")
TMP_DIR="$PARENT_DIR/tmp"

#------------------------------------------
# 🛠️ 4. tmp 디렉토리 만들고 파일 복사
#------------------------------------------
mkdir -p "$TMP_DIR"
cp -f "$ABS_FILE_PATH" "$TMP_DIR/$FILE_NAME"

#------------------------------------------
# 🚀 5. tmp 디렉토리로 이동하고 파일 실행
#------------------------------------------
cd "$TMP_DIR" || exit 1

echo "✅ Running script: $FILE_NAME in $TMP_DIR"
chmod +x "$FILE_NAME"
./"$FILE_NAME"

#------------------------------------------
# 📍 6. 현재 작업 위치 확인
#------------------------------------------
pwd

