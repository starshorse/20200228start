
#히스토그램 역투영(Histogram backprojection)
# 히스토그램 역투영은 영상의 각 픽셀이 주어진 히스토그램 모델에 얼마나 일치하는지를 검사하는 방법입니다.
# 임의의 색상 영역을 검출할 때 효과적입니다.
# YCrCb 색 공간을 이용합니다. (밝기에 상관없이 색을 검출하기 위함입니다.)
# HSV는 H 값을 이용해서 색상을 표현하기 좋을 때 이용합니다.
import numpy as np
import cv2 as cv
roi = cv.imread('box.png')
assert roi is not None, "file could not be read, check with os.path.exists()"
hsv = cv.cvtColor(roi,cv.COLOR_BGR2HSV)
target = cv.imread('roi.jpg')
assert target is not None, "file could not be read, check with os.path.exists()"
hsvt = cv.cvtColor(target,cv.COLOR_BGR2HSV)
# calculating object histogram
roihist = cv.calcHist([hsv],[0, 1], None, [180, 256], [0, 180, 0, 256] )
# normalize histogram and apply backprojection
cv.normalize(roihist,roihist,0,255,cv.NORM_MINMAX)
dst = cv.calcBackProject([hsvt],[0,1],roihist,[0,180,0,256],1)
# Now convolute with circular disc
disc = cv.getStructuringElement(cv.MORPH_ELLIPSE,(5,5))
cv.filter2D(dst,-1,disc,dst)
# threshold and binary AND
ret,thresh = cv.threshold(dst,50,255,0)
thresh = cv.merge((thresh,thresh,thresh))
res = cv.bitwise_and(target,thresh)
res = np.vstack((target,thresh,res))
cv.imwrite('res.jpg',res)
cv.imshow('backProjection', res )
cv.waitKey(0)
