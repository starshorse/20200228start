## 변수(Variable)
```
# 전역 변수 지정
string="hello world"
echo ${string}

# 지역 변수 테스트 함수
string_test() {
    # 전역 변수와 동일하게 사용함. 만약 local 뺀다면 전역 변수에 덮어씌어지게 됨
    local string="local"
    echo ${string}
}
# 지역 변수 테스트 함수 호출
string_test
# 지역 변수 테스트 함수에서 동일한 변수 명을 사용했지만 값이 변경되지 않음
echo ${string}

# 환경 변수 선언
export hello_world="hello world..."
# 자식 스크립트 호출은 스크립트 경로을 쓰면된다.
/home/export_test.sh

#환경 변수를 테스트하기 위해 export_test.sh 파일을 만들고 선언한 변수를 확인해본다.
echo ${hello_world}
```
## 배열(Array Variable)
```
# 배열의 크기 지정없이 배열 변수로 선언
# 참고: 'declare -a' 명령으로 선언하지 않아도 배열 변수 사용 가능함
declare -a array

# 4개의 배열 값 지정
array=("hello" "test" "array" "world")

# 기존 배열에 1개의 배열 값 추가(순차적으로 입력할 필요 없음)
array[4]="variable"

# 기존 배열 전체에 1개의 배열 값을 추가하여 배열 저장(배열 복사 시 사용)
array=(${array[@]} "string")

# 위에서 지정한 배열 출력
echo "hello world 출력: ${array[0]} ${array[3]}"
echo "배열 전체 출력: ${array[@]}"
echo "배열 전체 개수 출력: ${#array[@]}"

printf "배열 출력: %s\n" ${array[@]}

# 배열 특정 요소만 지우기
unset array[4]
echo "배열 전체 출력: ${array[@]}"

# 배열 전체 지우기
unset array
echo "배열 전체 출력: ${array[@]}"
```
## 변수 타입 지정(Variables Revisited)
```
# 읽기 전용
# readonly string_variable="hello world" 문법과 동일 함
declare -r string_variable

# 정수
# number_variable=10 문법과 동일 함
declare -i number_variable=10

# 배열
# array_variable=() 문법과 동일 함
declare -a array_variable

# 환경 변수
# export export_variable="hello world" 문법과 동일 함
declare -x export_variable="hello world"

# 현재 스크립트의 전체 함수 출력
declare -f

# 현재 스크립트에서 지정한 함수만 출력
declare -f 함수이름

```
## 반복문(for, while, until)
```
# 지정된 범위 안에서 반복문 필요 시 좋음
for string in "hello" "world" "..."; do;
    echo ${string};
done

# 수행 조건이 true 일때 실행됨 (실행 횟수 지정이 필요하지 않은 반복문 필요 시 좋음)
count=0
while [ ${count} -le 5 ]; do
    echo ${count}
    count=$(( ${count}+1 ))
done

# 수행 조건이 false 일때 실행됨 (실행 횟수 지정이 필요하지 않은 반복문 필요 시 좋음)
count2=10
until [ ${count2} -le 5 ]; do
    echo ${count2}
    count2=$(( ${count2}-1 ))
done
```

## 조건문(if...elif...else...fi)

```
string1="hello"
string2="world"
if [ ${string1} == ${string2} ]; then
    # 실행 문장이 없으면 오류 발생함
    # 아래 echo 문장을 주석처리하면 확인 가능함
    echo "hello world"
elif [ ${string1} == ${string3} ]; then
    echo "hello world 2"
else
    echo "hello world 3"
fi

# AND
if [ ${string1} == ${string2} ] && [ ${string3} == ${string4} ]
..생략

# OR
if [ ${string1} == ${string2} ] || [ ${string3} == ${string4} ]
..생략

# 다중 조건
if [[ ${string1} == ${string2} || ${string3} == ${string4} ]] && [ ${string5} == ${string6} ]
..생략
```
## 선택문(case)
```
# case문 테스트를 위한 반복문
for string in "HELLO" "WORLD" "hello" "world" "s" "start" "end" "etc"; do

    # case문 시작
    case ${string} in
        hello|HELLO)
            echo "${string}: hello 일때"
            ;;
        wo*)
            echo "${string}: wo로 시작하는 단어 일때"
            ;;
        s|start)
            echo "${string}: s 혹은 start 일때"
            ;;
        e|end)
            echo "${string}: e 혹은 end 일때"
            ;;
        *)
            echo "${string}: 기타"
            ;;
    esac
    # //case문 끝

done
```
## 디버깅(Debugging)

Bash 옵션(스크립트 실행 시)	set 옵션(스크립트 코드 삽입)	설명
bash -n	set -n, set -o noexec	스크립트 실행없이 단순 문법 오류만 검사(찾지 못하는 문법 오류가 있을수 있음)
bash -v	set -v, set -o verbose	명령어 실행전 해당 명령어 출력(echo)
bash -x	set -x, set -o xtrace	명령어 실행후 해당 명령어 출력(echo)
set -u, set -o nounset	미선언된 변수 발견시 "unbound variable" 메시지 출력







