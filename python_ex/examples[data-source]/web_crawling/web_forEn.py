"""
move to modules/selenium 
"""
from modules import selenium
from modules import openpyxl 
from os import listdir 
# from openpyxl import load_workbook , Workbook 
from time import sleep 


driver = selenium.getDriver()
selenium.get('https://finance.daum.net/domestic/influential_investors')
items = selenium.f_elem_by_className('box_contents') 

def list_chuck(arr, n):
    return [arr[i: i + n] for i in range(0, len(arr), n)]

items = selenium.f_elem_by_xpath('//*[@id="boxInfluentialInvestors"]/div[2]/div[1]/table')
list_items_info = items.text.splitlines()

del list_items_info[:2]
forEn = list_chuck( list_items_info, 4 )
print( forEn )
this_date = selenium.f_elem_by_xpath( '//*[@id="labDescription"]/em' )
print( this_date.text )
this_date_1 = this_date.text[6:]
this_date_mmdd = this_date_1.split('.')
print( this_date_mmdd )
from datetime import date 
this_year = date.today().year 
print( this_year )
this_date_2 = str(this_year)+"-"+this_date_mmdd[0]+"-"+this_date_mmdd[1]
print( this_date_2 )
for idx, x in enumerate( forEn ):
    if idx%2:
        x.append(-1)
    else :
        x.append(1)
    x.append( this_date_2 )
    
print( forEn )
result_xlsx_add = openpyxl.getWork_book('forEn.xlsx')
result_sheet_add =openpyxl.getSheet( result_xlsx_add , 'Sheet' )

max = openpyxl.getMax_row( result_sheet_add ); 
print( max )

for x in forEn:
    openpyxl.append( result_sheet_add , x )
    
openpyxl.save( result_xlsx_add, 'forEn.xlsx' );






