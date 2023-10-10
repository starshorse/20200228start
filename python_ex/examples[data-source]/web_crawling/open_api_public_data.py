#!/usr/bin/env python
# coding: utf-8
#get_ipython().system('pip3 install requests')
#get_ipython().system('pip3 install pprint')
#get_ipython().system('pip3 install json')

#라이브러리 import
import requests
import pprint
import os,sys 
import pdb 
from dotenv import load_dotenv 
from pathlib import Path 

sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import  my_pandas  as pandas 
import  beautifulsoup as bs4 
import  my_json as json 

dotenv_path = Path('../.env')
load_dotenv( dotenv_path = dotenv_path )

public_key = os.environ.get('OPENAPI_PUBLIC_KEY') 
# url 입력
#url = 'http://api.data.go.kr/openapi/tn_pubr_public_cctv_api?serviceKey=개인인증키입력&pageNo=1&numOfRows=10&type=json'
url = os.environ.get('OPENAPI_URL') 

#pdb.set_trace() 
response = requests.get(url)
contents = response.text
xml_obj = bs4.beautifulSoup_lxml_xml( contents )

# 데이터 결과값 예쁘게 출력해주는 코드
pp = pprint.PrettyPrinter(indent=4)
# print(pp.pprint(xml_obj))
rows = bs4.findAll( xml_obj, 'item' ) 
print(rows)
# 각 행의 컬럼, 이름, 값을 가지는 리스트 만들기
row_list = [] # 행값
name_list = [] # 열이름값
value_list = [] #데이터값

# xml 안의 데이터 수집
for i in range(0, len(rows)):
    columns = rows[i].find_all()
    #첫째 행 데이터 수집
    for j in range(0,len(columns)):
        if i ==0:
            # 컬럼 이름 값 저장
            name_list.append(columns[j].name)
        # 컬럼의 각 데이터 값 저장
        value_list.append(columns[j].text)
    # 각 행의 value값 전체 저장
    row_list.append(value_list)
    # 데이터 리스트 값 초기화
    value_list=[]

#xml값 DataFrame으로 만들기
# corona_df = pd.DataFrame(row_list, columns=name_list)
corona_df = pandas.dataFrame_row_column( row_list, name_list ); 
# print(corona_df.head(19))    
print( corona_df )
## json을 DataFrame으로 변환하기 ##
#문자열을 json으로 변경
print( contents )
contents = '''
           {"response": {"body": {"items":  
              [{ "name":"richard.choi" }]
           }}}
           '''   
json_ob = json.loads( contents )
print(type(json_ob)) #json타입 확인

# 필요한 내용만 꺼내기
body = json_ob['response']['body']['items']
print(body)

body = [{'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 구산동 1072-19', 'installationPurpsType': '생활방범', 'cctvNumber': '3', 'cctvPixel': '200', 'potogrfInfo': '현대병원뒤', 'cstdyDay': '30', 'installationYymm': '2019-11', 'phoneNumber': '055-330-4741', 'latitude': '35.249247', 'longitude': '128.871639', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 구산동 305-15', 'installationPurpsType': '생활방범', 'cctvNumber': '2', 'cctvPixel': '200', 'potogrfInfo': '목화골공원', 'cstdyDay': '30', 'installationYymm': '2019-12', 'phoneNumber': '055-330-4741', 'latitude': '35.247411', 'longitude': '128.873605', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 삼계동 1484-14', 'installationPurpsType': '생활방범', 'cctvNumber': '2', 'cctvPixel': '200', 'potogrfInfo': '정원빌라', 'cstdyDay': '30', 'installationYymm': '2019-06', 'phoneNumber': '055-330-4741', 'latitude': '35.2617277', 'longitude': '128.8741435', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 구산동 1043', 'installationPurpsType': '생활방범', 'cctvNumber': '4', 'cctvPixel': '200', 'potogrfInfo': '최가아구찜', 'cstdyDay': '30', 'installationYymm': '2019-05', 'phoneNumber': '055-330-4741', 'latitude': '35.247076', 'longitude': '128.872461', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 구산동 175-10', 'installationPurpsType': '생활방범', 'cctvNumber': '2', 'cctvPixel': '200', 'potogrfInfo': '동호맨션', 'cstdyDay': '30', 'installationYymm': '2019-12', 'phoneNumber': '055-330-4741', 'latitude': '35.241185', 'longitude': '128.8773341', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 부원동 663', 'installationPurpsType': '생활방범', 'cctvNumber': '3', 'cctvPixel': '200', 'potogrfInfo': '김해시청뒷길', 'cstdyDay': '30', 'installationYymm': '2019-05', 'phoneNumber': '055-330-4741', 'latitude': '35.228923', 'longitude': '128.889096', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 부원동 342-17', 'installationPurpsType': '생활방범', 'cctvNumber': '3', 'cctvPixel': '200', 'potogrfInfo': '쇄내마을남쪽', 'cstdyDay': '30', 'installationYymm': '2019-03', 'phoneNumber': '055-330-4741', 'latitude': '35.21492806', 'longitude': '128.887706', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 부원동 36-1', 'installationPurpsType': '생활방범', 'cctvNumber': '3', 'cctvPixel': '200', 'potogrfInfo': '김해중후문', 'cstdyDay': '30', 'installationYymm': '2019-03', 'phoneNumber': '055-330-4741', 'latitude': '35.232047', 'longitude': '128.886201', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 부원동 169-6', 'installationPurpsType': '생활방범', 'cctvNumber': '3', 'cctvPixel': '200', 'potogrfInfo': '미진숯불갈비', 'cstdyDay': '30', 'installationYymm': '2019-10', 'phoneNumber': '055-330-4741', 'latitude': '35.22822376', 'longitude': '128.8927683', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}, {'institutionNm': '경상남도 김해시청', 'rdnmadr': 'null', 'lnmadr': '경상남도 김해시 부원동 861-4', 'installationPurpsType': '생활방범', 'cctvNumber': '2', 'cctvPixel': '200', 'potogrfInfo': '한울빌', 'cstdyDay': '30', 'installationYymm': '2019-09', 'phoneNumber': '055-330-4741', 'latitude': '35.23016412', 'longitude': '128.881197', 'referenceDate': '2019-06-26', 'insttCode': '5350000'}]

dataframe = pandas.dataFrame_json(body)
dataframe
df = dataframe 
df.info()
df.describe()
df['cctvNumber'] = df['cctvNumber'].astype('int')
# df['cctvNumber'] =  pandas.astype_int( df['cctvNumber'] ) 
# df.pivot_table('cctvNumber', index=['institutionNm', 'potogrfInfo'], aggfunc='sum')
df3 = pandas.pivot_table( df, 'cctvNumber', ['institutionNm', 'potogrfInfo'], 'sum' )
pdb.set_trace() 
print( df3 ) 



