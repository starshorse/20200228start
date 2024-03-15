"""
    현재 주식 매수 일지 시트를  읽어와서 정리해서 다시 Sheet로 정리한다. 
    loading from a file. 
    from openpyxl import load_workbook 
    wb = load_workbook( filename = 'empty_book.xlsx' )
    sheet_ranges = wb ['range names'] 

    먼저 특정 Sheet에서 ws 선택하기. 
    df = DataFrame(ws.values)

    XLS 데이터를 DB화 작업 한다. 
"""
from openpyxl import load_workbook 
import pandas as pd 
import pdb


def load_f_xlsx( fileName , sheetName ):
    wb = load_workbook( filename = fileName ) 
    ws = wb[sheetName]
    df = pd.DataFrame( ws.values )
    df.columns = df.iloc[0] 
    df =  df.drop( df.index[0] )
    #df['종목코드'] = df['종목코드'].astype(str).str.pad(6 , fillchar='0' )
    #df['주요제품'] = df['주요제품'].astype(str).str.replace("'","_")
    print(df) 


if __name__=='__main__':
    load_f_xlsx( 'data_4854_20240314.xlsx','Sheet1') 
