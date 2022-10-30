#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import pdb


df = pd.read_excel('data_3608_20220912.xlsx')
df.info()
df
pdb.set_trace() 

df.loc[2470]['종목명']
df['종목명'] = df['종목명'].str.strip()
df_1 = pd.DataFrame({ '종목명':['희림','롯데지주','신한지주']})
df_1
df_2 = df_1.merge( df,how='left')
df_2
df3 = pd.read_clipboard()
df3 = df3.rename(columns = {'등락률':'등락률%'})
df3.info()
df3.info()
df.info()
df4 = df3.merge(df, how='left')
df4
df4  = df4.drop(df4[df4.PBR == '-'].index)
df4['PBR'] = df4['PBR'].astype('float')
df4.sort_values('PBR')
df4.loc[ df4.PBR.nsmallest(5).index ]




