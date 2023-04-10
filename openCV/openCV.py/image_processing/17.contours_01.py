import numpy as np
import cv2 as cv
im = cv.imread('shapes.png')
assert im is not None, "file could not be read, check with os.path.exists()"
imgray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)
ret, thresh = cv.threshold(imgray, 127, 255, 0)
contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

img  = cv.drawContours(imgray, contours, -1, (0,255,0), 3)

img2  = cv.drawContours(img, contours, 3, (0,255,0), 3)

# 컨투어 모든 좌표를 작은 파랑색 점(원)으로 표시 ---⑧
for i in contours:
    for j in i:
        cv.circle(img, tuple(j[0]), 1, (255,0,0), -1) 

# 컨투어 꼭지점 좌표를 작은 파랑색 점(원)으로 표시 ---⑨
for i in contours:
    for j in i:
        cv.circle(img2, tuple(j[0]), 1, (255,0,0), -1) 

cv.imshow('01', img2 )
cv.waitKey(0)
