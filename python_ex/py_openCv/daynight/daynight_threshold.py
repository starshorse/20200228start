import daynight_helper
import matplotlib.pyplot as plt
import cv2
import numpy as np 

#path to the folder where the images are
training_data_path = 'images/training'

training_data = daynight_helper.load_dataset(training_data_path)
std_training_data = daynight_helper.standardize_inputs(training_data)

img = std_training_data[0][0]
label = std_training_data[0][1]
plt.imshow(img)
print('Shape ', img.shape)
print('label: ', label)

#feature extraction - brightness using hsv
def brightness_value(img):
    hsv_img = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    v_values = np.sum(hsv_img[:, :, 2])
    area = img.shape[0] * img.shape[1]
    avg_brightness = v_values/area
    return avg_brightness

def estimate_label(img, threshold):
    avg_brightness = brightness_value(img)
    predicted_label = 0
    threshold = threshold
    if avg_brightness > threshold:
        predicted_label = 1
    return predicted_label, avg_brightness

def optimize_threshold(img_data, threshold):
    img = img_data[0]
    label = img_data[1]
    threshold = threshold
    pred_label, avg_brightness = estimate_label(img, threshold)
    if pred_label == label:
        return threshold
    else: 
        return round((avg_brightness+threshold)/2)

day_sample = std_training_data[10]
plt.imshow(day_sample[0])
cv2.imshow('frame', day_sample[0])
cv2.waitKey(0) 
print('day = 1, night - 0, label ', day_sample[1] )

night_sample = std_training_data[42]
plt.imshow(night_sample[0])
print('day = 1, night - 0, label ', night_sample[1] )


threshold = 120

for i in range(0, len(std_training_data)):
    img_data = std_training_data[i]
    threshold = optimize_threshold(img_data, threshold)

print('threshold ', threshold)
