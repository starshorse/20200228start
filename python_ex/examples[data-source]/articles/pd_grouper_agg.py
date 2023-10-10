import pandas as pd

df = pd.read_excel("https://github.com/chris1610/pbpython/blob/master/data/sample-salesv3.xlsx?raw=True")

df["date"] = pd.to_datetime(df['date'])

print( df.head())


print(df.set_index('date').resample('M')["ext price"].sum() )
