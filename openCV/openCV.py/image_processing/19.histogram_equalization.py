import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt
img = cv.imread('mountain.jpg', cv.IMREAD_GRAYSCALE)
assert img is not None, "file could not be read, check with os.path.exists()"
hist,bins = np.histogram(img.flatten(),256,[0,256])
cdf = hist.cumsum()
# change.. 
cdf_m = np.ma.masked_equal(cdf,0)
cdf_m = (cdf_m - cdf_m.min())*255/(cdf_m.max()-cdf_m.min())
cdf = np.ma.filled(cdf_m,0).astype('uint8')

cdf_normalized = cdf * float(hist.max()) / cdf.max()
plt.plot(cdf_normalized, color = 'b')
plt.hist(img.flatten(),256,[0,256], color = 'r')
plt.xlim([0,256])
plt.legend(('cdf','histogram'), loc = 'upper left')
plt.show()

img2 = cdf[img]

cv.imshow('hsto1', img2)
cv.waitKey(0)

# Histograms Equalization in OpenCV..  

equ = cv.equalizeHist(img)
res = np.hstack((img,equ)) #stacking images side-by-side

cv.imshow('histo2', res )
cv.waitKey(0)

# CLAHE( Contrast Limited Adaptive Histogram Equalization 

img = cv.imread('tsukuba_l.png', cv.IMREAD_GRAYSCALE)
assert img is not None, "file could not be read, check with os.path.exists()"
# create a CLAHE object (Arguments are optional).
clahe = cv.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
cl1 = clahe.apply(img)

res = np.hstack((img,cl1)) #stacking images side-by-side

cv.imshow('CLAHE', res )
cv.waitKey(0)

