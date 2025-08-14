import pandas as pd 
import numpy as np 
import pdb

url = 'https://raw.githubusercontent.com/justmarkham/DAT8/master/data/chipotle.tsv'
chipo = pd.read_csv(url, sep = '\t')

print( chipo )


df = pd.DataFrame({"A": ["foo", "foo", "foo", "foo", "foo",
                         "bar", "bar", "bar", "bar"],
                   "B": ["one", "one", "one", "two", "two",
                         "one", "one", "two", "two"],
                   "C": ["small", "large", "large", "small",
                         "small", "large", "small", "small",
                         "large"],
                   "D": [1, 2, 2, 3, 3, 4, 5, 6, 7],
                   "E": [2, 4, 5, 5, 6, 6, 8, 9, 9]})

print(df)

table = pd.pivot_table( df, values='D', index=['A','B'], columns = ['C'], aggfunc=np.sum, fill_value=0  )
print( table ) 


pdb.set_trace(); 

c = chipo.groupby('item_name')
c = c.sum()
c = c.sort_values(['quantity'], ascending=False )
c = c.head(1)
print(c) 

"""
chipo의 item_price 를 Object에서 float 로 apply( lambda x : x.replcae('$', '' ) , astype('float')로 바꾼다. 
'total_price' = 'item_price' * 'quantity'  
chipo.groupby('item_name')['total_price'].sum() 



"""

