"""
    $ import sys
    sys.path.append(file_path)
    import module_name

    sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
    import  my_pandas  as pandas 
"""

import pandas as pd
from pandas.io.json import json_normalize
import pdb

"""
     df4['PBR'] = df4['PBR'].astype('float')
"""

def astype_float( df, field ):
    return df[field].astype['float'] 

def astype_int(  field ):
    return field.astype['int'] 

def dataFrame( dic_data ):
    return pd.DataFrame( dic_data )

def dataFrame_row_column( row_list, name_list ): 
    return pd.DataFrame( row_list, columns = name_list ) 

def dataFrame_json( body ):
    return json_normalize(body); 

def drop_condition_eq( df, field, value ):
    return df.rop( df[ df[field]  == value ].index )

def fillna( df , replace_string = "" ):
    return df.fillna( replace_string)

def merge_left( df_1 , df_2, left_on, right_on ):
    return df_1.merge( df_2, how='left', left_on = left_on , right_on = right_on ) 

"""
    iterator 
    for index, row in dataFrame.iterrows():
        row['field'] 
"""

def pivot_table( df, field , index_array , aggfunc ):
    return df.pivot_table( field, index_array, aggfunc = aggfunc )     

"""
    xslx file read ..  engine='openpyxl' 
"""
def read_excel( file_name ):
    return pd.read_excel( file_name, engine='openpyxl')
def read_json( file_name ):
    return pd.read_json( file_name )

def read_clipboard():
    return pd.read_clipboard() 

def read_sql( sql ,  conn ):
    return pd.read_sql( sql , con = conn )

"""
     df3 = df3.rename(columns = {'등락률':'등락률%'})
"""
def rename_columns( df, dic_data ):
    return df.rename( columns = dic_data )     

"""
    field is string 
    i.e) 
    df['종목명'] = df['종목명'].str.strip()
"""
def strip_string( df_field ):
    return df_field.str.strip() 

def sort_values( df , field ):
    return df.sort_values( field )

def to_json( df, file_name , orient='records'):
    return df.to_json( file_name , orient ); 

def nsmallest_index( df , field , rank ):
    return df[field].nsmallest( rank ).index 
