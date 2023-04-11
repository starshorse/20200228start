import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt 
img = cv.imread('mountain.jpg')
assert img is not None, "file could not be read, check with os.path.exists()"

# 2D Histogram in OpenCV.. 

hsv = cv.cvtColor(img,cv.COLOR_BGR2HSV)
hist = cv.calcHist([hsv], [0, 1], None, [180, 256], [0, 180, 0, 256])

print( hsv )

# 2D Histogram in Numpy..

hsv = cv.cvtColor(img,cv.COLOR_BGR2HSV)
h, s,v = cv.split(hsv)
hist, xbins, ybins = np.histogram2d(h.ravel(),s.ravel(),[180,256],[[0,180],[0,256]])

print( hist )

# Plotting 2D Histograms 
plt.imshow( hist, interpolation = 'nearest')
plt.show() 
