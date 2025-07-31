# main.py

from data_utils import workflow

if __name__ == '__main__':
    config = {
        'excel_path': './resource/xlsx/data_3608_20220912.xlsx',
        'stock_column': '종목명',
        'example_values': ['삼성전자', 'LG화학', '카카오'],
        'join_columns': ['종목명'],
        'pbr_column': 'PBR',
        'invalid_pbr_values': ['-'],
        'lowest_n': 5,
        'clipboard_rename_dict': {'등락률': '등락률%'},
        'excel_columns': [
            '종목코드','종목명', '시가총액','PER','PBR','배당금','배당율','부채비율','시장'
        ]
    }
    results = workflow(config)

