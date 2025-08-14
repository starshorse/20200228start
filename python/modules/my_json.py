import json 
"""
 dumps() 함수: Python 객체를 JSON 문자열로 변환
 디폴트로 변환되는 JSON 문자열은 위와 같이 한 줄이기 때문에 Python 객체가 많은 데이터를 담고 있는 경우, 
 가독성이 떨어질 수 있습니다. 이럴 경우, 
 indent 파라미터에 숫자를 넘기면 그 만큼 들여쓰기가 되어 JSON 문자열로 변환이 됩니다.
""" 

def dumps( json_object, indent = 2 ):
    return json.dumps( json_object, indent )

"""
load() 함수: JSON 파일을 Python 객체로 불러오기
with open('input.json') as f:
    json_object = json.load(f)

assert json_object['id'] == 1
assert json_object['email'] == 'Sincere@april.biz'
assert json_object['address']['zipcode'] == '92998-3874'
assert json_object['admin'] is False
assert json_object['hobbies'] is None
"""

def load( json_str ):
    return json.load( json_str )

def loads( json_str ):
    return json.loads( json_str )

"""
dump() 함수: Python 객체를 JSON 파일에 저장하기
Python 객체를 JSON 문자로 변환한 결과를 파일에 바로 쓰고(write) 싶은 경우에는 dumps() 대신에 dump() 함수를 사용합니다.

json_object = {
    "id": 1,
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874"
    },
    "admin": False,
    "hobbies": None
}
with open('output.json', 'w') as f:
    json.dump(json_object, f, indent=2)
output.json
"""
def dump( json_object, file_p, indent=2 ):
    return json.dump( json_object, file_p , indent );
