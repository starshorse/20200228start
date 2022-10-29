#!/usr/bin/env python
# coding: utf-8

# In[ ]:





# In[1]:


import pandas as pd


# In[2]:


df = pd.read_excel('data_3608_20220912.xlsx')


# In[3]:


df.info()


# In[4]:


df


# In[24]:


df.loc[2470]['종목명']


# In[19]:


df['종목명'] = df['종목명'].str.strip()


# In[ ]:





# In[6]:


df_1 = pd.DataFrame({ '종목명':['희림','롯데지주','신한지주']})
df_1


# In[27]:


df_2 = df_1.merge( df,how='left')
df_2


# In[16]:


df3 = pd.read_clipboard()
df3 = df3.rename(columns = {'등락률':'등락률%'})
df3.info()


# In[9]:


df3.info()


# In[10]:


df.info()


# In[38]:


df4 = df3.merge(df, how='left')
df4


# In[49]:


df4  = df4.drop(df4[df4.PBR == '-'].index)
df4['PBR'] = df4['PBR'].astype('float')
df4.sort_values('PBR')
df4.loc[ df4.PBR.nsmallest(5).index ]


# In[ ]:





# In[ ]:





# In[ ]:




