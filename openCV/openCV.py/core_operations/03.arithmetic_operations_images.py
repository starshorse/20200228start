import cv2 as cv
import numpy as np 

x = np.uint8([250])
y = np.uint8([10])


# Image Addition 
print( cv.add(x,y) ) # 250 + 10 = 260 => 255 
print( x + y ) # 250+10 = 260 % 256 =4 

# Image Blending 

img1 = cv.imread('ml.png')
img2 = cv.imread('opencv-logo.png')
assert img1 is not None, "file could not be read, check with os.path.exists()"
assert img2 is not None, "file could not be read, check with os.path.exists()"
img1 = cv.resize(img1, dsize=(640, 480), interpolation=cv.INTER_AREA)
img2 = cv.resize(img2, dsize=(640, 480), interpolation=cv.INTER_AREA)

dst = cv.addWeighted( img1, 0.7 , img2 , 0.3 , 0)

cv.imshow('dst', dst );
cv.waitKey(0);
cv.destroyAllWindows() 
