#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <javascript_file>"
    exit 1
fi

INPUT_FILE="$1"

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: '$INPUT_FILE' is not a valid file."
    exit 1
fi

INPUT_FILE_ABS=$(readlink -f "$INPUT_FILE")
FILE_NAME=$(basename "$INPUT_FILE_ABS")
CURRENT_DIR=$(dirname "$INPUT_FILE_ABS")
cd "$CURRENT_DIR/.." || exit 1

mkdir -p tmp

cp -f "$INPUT_FILE_ABS" "tmp/$FILE_NAME"

cd tmp || exit 1    # 여기서 tmp 디렉토리로 이동

node "$FILE_NAME"

# 아래의 pwd는 확인용(원하면 삭제)
pwd

