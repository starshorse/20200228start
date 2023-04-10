import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

img = cv.imread('roi.jpg')
assert img is not None, "file could not be read, check with os.path.exists()"
lower_reso = cv.pyrDown(img)
high_reso = cv.pyrUp(img)

cv.imshow('pyrUp', high_reso ) 
cv.imshow('img', img )
cv.imshow('pyrDown', lower_reso ) 

cv.waitKey(0)
cv.destroyAllWindows() 
