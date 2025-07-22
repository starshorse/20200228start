#!/bin/bash

# 1. 인자 체크
if [ $# -eq 0 ]; then
    echo "Usage: $0 <path-to-js-file>"
    exit 1
fi

TARGET_FILE="$1"

# 2. 실존하는 파일인지 확인
if [ ! -f "$TARGET_FILE" ]; then
    echo "Error: '$TARGET_FILE' is not a valid file."
    exit 1
fi

# 3. 절대 경로/파일명 등 추출
FILE_ABS_PATH=$(readlink -f "$TARGET_FILE")
FILE_NAME=$(basename "$FILE_ABS_PATH")

# 4. 현재 디렉토리 기준 상위 디렉토리 찾기
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")

# 5. 상위 디렉토리에 tmp 디렉토리 만들기
TMP_DIR="$PARENT_DIR/tmp"
mkdir -p "$TMP_DIR"

# 6. 파일 복사 (덮어쓰기 허용)
cp -f "$FILE_ABS_PATH" "$TMP_DIR/$FILE_NAME"

# 7. tmp 디렉토리로 이동
cd "$TMP_DIR" || exit 1

# 8. Node 실행
echo ">>> Running: node $FILE_NAME in $TMP_DIR"
node "$FILE_NAME"

# 9. 현재 위치 출력
pwd

