from pykrx import stock
import pandas as pd
import datetime 
import pdb
codes = [
'000390',
'000720',
'001560',
'001740',
'001780',
'001810',
'003120',
'003410',
'003610',
'005490',
'005820',
'005940',
'007590',
'007770',
'009680',
'010060',
'010950',
'014470',
'016360',
'032560',
'033920',
'034220',
'035250',
'053350',
'055550',
'058860',
'078000',
'092460',
'138070',
'282690',
'456040'
]

def get_myStocks():
    df_mine = pd.DataFrame( { '종목코드': codes } );
    return df_mine 


if __name__=='__main__':
    print( get_myStocks());






