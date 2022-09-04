import openpyxl 
from openpyxl import load_workbook , workbook 
from datetime import datetime as dt
import serial 

myfile = 'A31M223_응용 평가 항목 check List(FPGA)_new.xlsx'
tg_xlsx = load_workbook( myfile)
sheet = tg_xlsx['1. A31M223 FPGA AE CheckList']
cells_list = ['N14','N15','N16','N17','N18']

port = "COM4"
# port = "COM3"
baud = 38400
ser = serial.Serial( port , baud , timeout = 1)
test_items = ['1','2']

try:
    for value in test_items: 
        ser.write(value.encode('euc-kr'))
        while True:
            if ser.readable():
                res_b = ser.readline()
                res = res_b.decode('euc-kr')
                print(res)
                if res.find('result') != -1:
                    cell_address = cells_list[ int(value) - 1 ]
                    now = dt.now()
                    sheet[cell_address]= f'OK [{ now }]' 
                    break
    tg_xlsx.save('test.xlsx')             
except KeyboardInterrupt:
    pass