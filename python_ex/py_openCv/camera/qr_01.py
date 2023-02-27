import cv2 
import time 
import pyzbar.pyzbar as pyzbar 
import pdb
from playsound import playsound 

used_codes = []
data_list = []

try:
    f = open("qrbarcode_date.txt", "r", encoding="utf8") 
    data_list = f.readlines()
except FileNotFoundError:
    pass
else:
    f.close() 

#cap = cv2.VideoCapture( cv2.CAP_ANY+0)   # 0: default camera 
#cap = cv2.VideoCapture( cv2.CAP_OPENCV_MJPEG+0)   # 0: default camera 
#cap = cv2.VideoCapture( cv2.CAP_FFMPEG+0)   # 0: default camera 
#cap = cv2.VideoCapture( cv2.CAP_MSMF+0)   # 0: default camera 
#cap = cv2.VideoCapture( 0,cv2.CAP_DSHOW )   # 0: default camera 
#cap = cv2.VideoCapture("WIN_20230224_17_13_10_Pro.mp4") # 동영상 파일에서 읽기 ..
cap = cv2.VideoCapture("WIN_20230224_18_00_17_Pro.mp4") # 동영상 파일에서 읽기 ..

# 비디오 프레임 크기, 전체 프레임수, FPS 등 출력
print('Frame width:', int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)))
print('Frame height:', int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
print('Frame count:', int(cap.get(cv2.CAP_PROP_FRAME_COUNT)))

fps = cap.get(cv2.CAP_PROP_FPS)
print('FPS:', fps)

#cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920 )
cap.set(cv2.CAP_PROP_FPS, 30 )
time.sleep(2) 

for i in data_list:
    used_codes.append(i.rstrip('\n'))


while cap.isOpened():
    success, frame = cap.read()
    if success:
        for code in pyzbar.decode(frame): 
            cv2.imwrite('qrbarcode_image.png', frame )
            my_code = code.data.decode('utf-8')
            if my_code not in used_codes:
                print("인식성공:", my_code)
      #          playsound("qrbarcode_beep.mp3")
                used_codes.append(my_code)
                f2 = open("qrbarcode_data.txt","a", encoding="utf8") 
                f2.write(my_code+'\n')
                f2.close()
            elif my_code in used_codes:
                print("이미 인식돈 코드입니다.!!!")
       #         playsound("qrbarcode_beep.mp3") 
            else:
                pass

        cv2.imshow('Camera Window', frame )
        # ESC Exit.
        key = cv2.waitKey(1) & 0xFF
        if( key == 27 ):
            break

cap.release()
cv2.destroyAllWindows() 
