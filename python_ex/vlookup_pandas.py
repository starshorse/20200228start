#!/usr/bin/env python
# coding: utf-8
import sys, os
import pdb

sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import  my_pandas  as pandas 

df = pandas.read_excel('data_3608_20220912.xlsx')
# df.info()
print( df );
#pdb.set_trace() 

df.loc[2470]['종목명']
df['종목명'] = pandas.strip_string( df['종목명'] )

df_1 = pandas.dataFrame({ '종목명':['희림','롯데지주','신한지주']})
print( df_1 )
df_2 = pandas.merge_left( df_1, df )
print( df_2 )
# from where stock.naver.com ? 
df3 = pandas.read_clipboard()
df3 = df3.rename(columns = {'등락률':'등락률%'})
# df3.info()
# df3.info()
# df.info()
print( df3 )
df4 = df3.merge(df, how='left')
df4
df4  = df4.drop(df4[df4.PBR == '-'].index)
df4['PBR'] = df4['PBR'].astype('float')
df4.sort_values('PBR')
df4.loc[ df4.PBR.nsmallest(5).index ]




