from jandi_webhook import send_jandi
import cv2 
import numpy as np 
from datetime import datetime

cur_mode = 1 
last_event_time  = datetime.now() 
send_period_minutes = 5 
threshold = 113 


def brightness_value(img):
    hsv_img = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    v_values = np.sum(hsv_img[:, :, 2])
    area = img.shape[0] * img.shape[1]
    avg_brightness = v_values/area
    return avg_brightness

def standardize_image(image):
    std_img=  cv2.resize(image, (1110, 600))   
    return std_img

def estimate_label(img, threshold):
    avg_brightness = brightness_value(img)
    predicted_label = 0
    threshold = threshold
    if avg_brightness > threshold:
        predicted_label = 1
    return predicted_label, avg_brightness

def detect_send_event(img):
    global cur_mode 
    global last_event_time 
    img = standardize_image( img )
    pred, avg_br = estimate_label( img, threshold ) 
    if( pred == 0 and cur_mode == 1 ):
        cur_mode = 0 
        message ="Office light [OFF]" 
        send_jandi( message, 1 )
    elif( pred == 1 and cur_mode == 0 ):
        cur_mode = 1 
        message ="Office light [ON]"
        send_jandi( message, 1 )
    elif( pred == 1 ):
        event_time = datetime.now() 
        elapsed_time_minute = (event_time - last_event_time ).total_seconds()/60 
        print( elapsed_time_minute );
        if( elapsed_time_minute > send_period_minutes ):
            message ="Motion Event Detected!"
            send_jandi( message, 0 ) 
            last_event_time = event_time 

if __name__=="__main__":
    image_path = "images/off.jpg" 
    img = cv2.imread( image_path ) 
    detect_send_event(img) 

