# YADDAT Data Analysis

Hi! Thank you for taking an interest in this project. Before beginning the analysis, please note that YADDAT is both my first attempt at web app design and test/scale validation, so understanding and constructive criticism are desirable. 

As my starting point, I searched through the AB5C subset of the [IPIP](https://ipip.ori.org/) to find potential questions for YADDAT. I took all items that felt appropriate to measure ethic and moral scales, as defined by my interpretation of D&D [alignment](https://dungeonsdragons.fandom.com/wiki/Alignment).  Item response [data](https://dataverse.harvard.edu/file.xhtml?persistentId=doi:10.7910/DVN/UF52WY/EYX80C&version=1.0) from the **Eugene-Springfield Community Sample** was then downloaded for data analysis.

Now that's established, I'll load the data and clean it.  Once properly cleaned and formatted, I will test the **internal consistency** of YADDAT's ethic and moral scales via [**Cronbach's alpha**](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4205511/). 


## Loading the Data

Clearly, numpy and pandas will be needed in this analysis, so they'll be imported. After that, the tab delimited item response data can be read into a dataframe by pandas' **read_csv** function. 


```python
import numpy as np
import pandas as pd

# Read the tab delimited file into a dataframe
filename = 'IPIP2539-1.tab'
df = pd.read_csv(filename, sep='\t', engine='python')

#Preview Data. Note, items/questions are columns and rows are raw subject responses
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ID</th>
      <th>A1</th>
      <th>A10</th>
      <th>A100</th>
      <th>A101</th>
      <th>A102</th>
      <th>A103</th>
      <th>A104</th>
      <th>A105</th>
      <th>A106</th>
      <th>...</th>
      <th>X89</th>
      <th>X90</th>
      <th>X91</th>
      <th>X92</th>
      <th>X93</th>
      <th>X95</th>
      <th>X96</th>
      <th>X97</th>
      <th>X98</th>
      <th>X99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1001</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1002</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>5.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1003</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>5.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1004</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1005</td>
      <td>5.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1137</th>
      <td>2462</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>...</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>5.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1138</th>
      <td>2463</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1139</th>
      <td>2464</td>
      <td>5.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>5.0</td>
      <td>...</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>1140</th>
      <td>2465</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1141</th>
      <td>2466</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>1142 rows × 2540 columns</p>
</div>



## Cleaning the Data
By default, this data has question items as columns and subject responses as rows. Looking at the raw data, some issues I notice are that responses are floats instead of integers and missing values (NaNs) are common.

First, I need to create seperate dataframes for items in the ethic and moral scales. I'll create lists for my column names and then use those to index the appropriate data column in its respective dataframe. Following that, I remove rows that have at least 1 missing value and then convert floats to integrers.


```python
#Create seperate lists for the chosen ethics and morality items
ethicList = ['X136','X150','H296','H575','H1346','H498','H579','E122','X118','H309','H215','H941','H250','H1327','H400','E7','E146','X274','X146','H925','X77','X204','H1140','H294','H170','E52','X263','E35','H88','H1351','X173','H870','E46','H1350','H303','X122','H926']
moralList = ['H794','H1328', 'H1100', 'X253', 'H714', 'H29','H1130','X259','H183','H198','E115','X70','H126','X203','X244','X210','H33','X113','H159','H105','H792','E166','H22','X177','H153','H435','E121','H98','H109', 'H721', 'X227', 'X185']

#Create seperate dataframes for moral and ethic dimensions
ethicDF_0 = df[ethicList]
moralDF_0 = df[moralList]

#Print the dimensions of each raw frame
print('Unclean Data')
print("Ethic Rows: "+ str(ethicDF_0.shape[0])+"    Ethic Columns: "+ str(ethicDF_0.shape[1]))
print("Moral Rows: "+ str(moralDF_0.shape[0])+"    Moral Columns: "+ str(moralDF_0.shape[1]))

#Delete rows that have at least 1 missing value
ethicDF_1 = ethicDF_0.dropna(axis=0, how='any')
moralDF_1 = moralDF_0.dropna(axis=0, how='any')

#Convert float to int
ethicDF_1 = ethicDF_1[ethicList].astype(int)
moralDF_1 = moralDF_1[moralList].astype(int)


#Print the dimensions of each clean frame
print("")
print('Clean Data')
print("Ethic Rows: "+ str(ethicDF_1.shape[0])+"    Ethic Columns: "+ str(ethicDF_1.shape[1]))
print("Moral Rows: "+ str(moralDF_1.shape[0])+"    Moral Columns: "+ str(moralDF_1.shape[1]))

#Preview the moral dataframe
moralDF_1
```

    Unclean Data
    Ethic Rows: 1142    Ethic Columns: 37
    Moral Rows: 1142    Moral Columns: 32
    
    Clean Data
    Ethic Rows: 570    Ethic Columns: 37
    Moral Rows: 570    Moral Columns: 32
    




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>H794</th>
      <th>H1328</th>
      <th>H1100</th>
      <th>X253</th>
      <th>H714</th>
      <th>H29</th>
      <th>H1130</th>
      <th>X259</th>
      <th>H183</th>
      <th>H198</th>
      <th>...</th>
      <th>H22</th>
      <th>X177</th>
      <th>H153</th>
      <th>H435</th>
      <th>E121</th>
      <th>H98</th>
      <th>H109</th>
      <th>H721</th>
      <th>X227</th>
      <th>X185</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>5</td>
      <td>5</td>
      <td>3</td>
      <td>3</td>
      <td>5</td>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>...</td>
      <td>3</td>
      <td>1</td>
      <td>4</td>
      <td>1</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
      <td>5</td>
      <td>1</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>5</td>
      <td>1</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>...</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>2</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>3</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>3</td>
      <td>4</td>
      <td>4</td>
    </tr>
    <tr>
      <th>7</th>
      <td>2</td>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>2</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1124</th>
      <td>1</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>1</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>1</td>
      <td>3</td>
      <td>5</td>
      <td>2</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1125</th>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>1</td>
      <td>1</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>1</td>
      <td>4</td>
      <td>5</td>
      <td>1</td>
      <td>1</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1129</th>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>5</td>
      <td>1</td>
      <td>3</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>...</td>
      <td>3</td>
      <td>5</td>
      <td>5</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>4</td>
      <td>3</td>
      <td>1</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1137</th>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>3</td>
      <td>1</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>3</td>
      <td>4</td>
      <td>2</td>
      <td>1</td>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1139</th>
      <td>1</td>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>3</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>1</td>
      <td>2</td>
      <td>1</td>
      <td>5</td>
      <td>2</td>
      <td>2</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<p>570 rows × 32 columns</p>
</div>



## Scoring Responses
Since the data consists of raw item responses, I will need to score the data. Although somewhat changed, both of YADDAT's scales have positively and negatively framed questions, like the AB5C. Thus, positive item answers can remained unchanged, but negative items will need to be reversed (i.e. 1 &#8594; 5, 2 &#8594; 4, 3 &#8594; 3, 4 &#8594; 2, and 5 &#8594; 1)


```python
#Score items responses based on + or - key
revrs = {1: 5, 2: 4, 3: 3, 4: 2, 5: 1}

#Define list of - columns
negativeEthicItems = ['H575','H1346','H498','H579','E122','H941','H1327','H400','E7','E146','H925','X204','H1140','E35','H88','H870','E46','X122','H926']
negativeMoralItems = ['H794','H1328','H714','X70','X203','X244','X210','X113','H792','E166','H435','E121','H98','H721','X227','X185']

#Reverse score negative columns
ethicDF_2 = ethicDF_1
ethicDF_2[negativeEthicItems] = ethicDF_2[negativeEthicItems].replace(revrs) 


moralDF_2 = moralDF_1
moralDF_2[negativeMoralItems] = moralDF_2[negativeMoralItems].replace(revrs) 


#Preview the new moral dataframe
moralDF_2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>H794</th>
      <th>H1328</th>
      <th>H1100</th>
      <th>X253</th>
      <th>H714</th>
      <th>H29</th>
      <th>H1130</th>
      <th>X259</th>
      <th>H183</th>
      <th>H198</th>
      <th>...</th>
      <th>H22</th>
      <th>X177</th>
      <th>H153</th>
      <th>H435</th>
      <th>E121</th>
      <th>H98</th>
      <th>H109</th>
      <th>H721</th>
      <th>X227</th>
      <th>X185</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>3</td>
      <td>3</td>
      <td>5</td>
      <td>2</td>
      <td>5</td>
      <td>4</td>
      <td>...</td>
      <td>3</td>
      <td>1</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>...</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
    </tr>
    <tr>
      <th>6</th>
      <td>4</td>
      <td>1</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>3</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>3</td>
      <td>2</td>
      <td>5</td>
      <td>3</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1124</th>
      <td>5</td>
      <td>1</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>5</td>
      <td>3</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
    </tr>
    <tr>
      <th>1125</th>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>1</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>2</td>
      <td>5</td>
      <td>2</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1129</th>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>3</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
      <td>...</td>
      <td>3</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>3</td>
      <td>5</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1137</th>
      <td>5</td>
      <td>5</td>
      <td>5</td>
      <td>3</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>3</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>2</td>
      <td>4</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1139</th>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>3</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>...</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>5</td>
      <td>4</td>
      <td>5</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
<p>570 rows × 32 columns</p>
</div>




```python
#Calculate alpha for both dimensions
def cronbach_alpha(df):
    # 1. Transform the df into a correlation matrix
    df_corr = df.corr()
    
    # 2.1 Calculate N
    # The number of variables equals the number of columns in the df
    N = df.shape[1]
    
    # 2.2 Calculate R
    # For this, we'll loop through the columns and append every
    # relevant correlation to an array calles "r_s". Then, we'll
    # calculate the mean of "r_s"
    rs = np.array([])
    for i, col in enumerate(df_corr.columns):
        sum_ = df_corr[col][i+1:].values
        rs = np.append(sum_, rs)
    mean_r = np.mean(rs)
    
   # 3. Use the formula to calculate Cronbach's Alpha 
    cronbach_alpha = (N * mean_r) / (1 + (N - 1) * mean_r)
    return cronbach_alpha

print("Ethics Alpha: "+str(cronbach_alpha(ethicDF_2))+"     Moral Alpha: "+str(cronbach_alpha(moralDF_2)))
```

    Ethics Alpha: 0.8733319768357972     Moral Alpha: 0.8755986994829529
    


```python

```
