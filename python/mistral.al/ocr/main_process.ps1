#1. input_folder 에 이미지파일을 넣고 perform_preprocess.py를 실행하면 인식하기 좋은 형태로 변환
python .\perform_preprocess.py

#images폴더에 파일을 저장 
#2. mistral_table_ocr.py를 실행하면 표를 인식하여 작업내용을 json파일에 저장함
python .\mistral_table_ocr.py

#3. postprocess_pandas.py를 실행해서   json파일을  작업내용을
python .\postprocess_pandas.py

#4. postprocess_2db.py 를 실행하면 DB로 들어갑니다
python .\postprocess_2db.py


