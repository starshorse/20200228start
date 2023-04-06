import cv2 as cv
import numpy as np
img = cv.imread('j.png', cv.IMREAD_GRAYSCALE)
assert img is not None, "file could not be read, check with os.path.exists()"
kernel = np.ones((5,5),np.uint8)
erosion = cv.erode(img,kernel,iterations = 1)
cv.imshow('erosion', erosion)
cv.waitKey(0)

dilation = cv.dilate(img,kernel,iterations = 1)
cv.imshow('dilation', dilation )
cv.waitKey(0)

opening = cv.morphologyEx(img, cv.MORPH_OPEN, kernel)
cv.imshow('opening', opening )
cv.waitKey(0)

closing = cv.morphologyEx(img, cv.MORPH_CLOSE, kernel)
cv.imshow('closing', closing )
cv.waitKey(0)

gradient = cv.morphologyEx(img, cv.MORPH_GRADIENT, kernel)
cv.imshow('gradient', gradient )
cv.waitKey(0)

tophat = cv.morphologyEx(img, cv.MORPH_TOPHAT, kernel)
cv.imshow('tophat', tophat )
cv.waitKey(0)

blackhat = cv.morphologyEx(img, cv.MORPH_BLACKHAT, kernel)
cv.imshow('blackhat', blackhat )
cv.waitKey(0)

