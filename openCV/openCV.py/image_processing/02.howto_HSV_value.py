import cv2 as cv
import numpy as np

green = np.uint8([[[0,255,0 ]]])
hsv_green = cv.cvtColor( green, cv.COLOR_BGR2HSV )
print( hsv_green )

