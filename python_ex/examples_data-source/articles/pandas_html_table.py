import pandas as pd
import numpy as np
from unicodedata import normalize

def clean_normalize_whitespace(x):
    """ Normalize unicode characters and strip trailing spaces
    """
    if isinstance(x, str):
        return normalize('NFKC', x).strip()
    else:
        return x

# Read in the Wikipedia page and get the DataFrame
table_GDP = pd.read_html(
    'https://en.wikipedia.org/wiki/Economy_of_the_United_States',
    match='Nominal GDP')
df_GDP = table_GDP[0]

# Clean up the DataFrame and Columns
df_GDP = df_GDP.applymap(clean_normalize_whitespace)
df_GDP.columns = df_GDP.columns.to_series().apply(clean_normalize_whitespace)

# Determine numeric types for each column
col_type = {
    'Year': 'int',
    'Nominal GDP(in bil. US-Dollar)': 'float',
    'GDP per capita(in US-Dollar)': 'int',
    'GDP growth(real)': 'float',
    'Inflation rate(in percent)': 'float',
    'Unemployment (in percent)': 'float',
    'Budget balance(in % of GDP)[107]': 'float',
    'Government debt held by public(in % of GDP)[108]': 'float',
    'Current account balance(in % of GDP)': 'float'
}

# Values to replace
clean_dict = {'%': '', '−': '-', '\(est\)': ''}

# Replace values and convert to numeric values
df_GDP = df_GDP.replace(clean_dict, regex=True).replace({
    '-n/a ': np.nan
}).astype(col_type)
