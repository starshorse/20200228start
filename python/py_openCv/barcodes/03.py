import cv2
import numpy as np
import time
from daynight_detect import detect_send_event

thresh = 25
max_diff = 200 

frame_1,frame_2,frame_3 = None, None, None  
camera = cv2.VideoCapture(0)

if camera.isOpened():
    success, frame_1 = camera.read() 
    success, frame_2 = camera.read() 
    while success:
        success, frame_3 = camera.read()
        frame_4 = frame_3.copy() 
        if not success:
            break

        frame_1_gray = cv2.cvtColor( frame_1, cv2.COLOR_BGR2GRAY ) 
        frame_2_gray = cv2.cvtColor( frame_2, cv2.COLOR_BGR2GRAY ) 
        frame_3_gray = cv2.cvtColor( frame_3, cv2.COLOR_BGR2GRAY ) 
        diff1 = cv2.absdiff( frame_1_gray, frame_2_gray )
        diff2 = cv2.absdiff( frame_2_gray, frame_3_gray )

        success, diff1_t = cv2.threshold( diff1, thresh, 255, cv2.THRESH_BINARY )
        success, diff2_t = cv2.threshold( diff2, thresh, 255, cv2.THRESH_BINARY )
        
        diff = cv2.bitwise_and( diff1_t, diff2_t ) 

        k = cv2.getStructuringElement( cv2.MORPH_CROSS, (3,3 ))
        diff = cv2.morphologyEx( diff, cv2.MORPH_OPEN, k )
        diff_cnt = cv2.countNonZero( diff )
        if diff_cnt > max_diff:
            nzero = np.nonzero(diff)
            cv2.rectangle( frame_4, (min(nzero[1]), min(nzero[0])), \
                                    (max(nzero[1]), max(nzero[0])), (0,255,0), 2 )
            cv2.putText( frame_4, "Motion Detected", (10,30), \
                            cv2.FONT_HERSHEY_DUPLEX, 0.5, (0,0,255))
            now_time = time.strftime('%Y_%m_%d-%H_%M_%S')
            cv2.imwrite( "motion{}.jpg".format(now_time), frame_4 )
            detect_send_event( frame_4 ) 
 
        stacked = np.hstack(( frame_4, cv2.cvtColor( diff, cv2.COLOR_GRAY2BGR )))
        cv2.imshow('motion sensor', stacked )

        frame_1 = frame_2
        frame_2 = frame_3 
        if cv2.waitKey(1) & 0xFF == 27:
            break
     

    
