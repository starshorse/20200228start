import cv2 as cv
import numpy as np 

img1 = cv.imread('roi.jpg')
assert img1 is not None, "file could not be read, check with os.path.exists()"

print( cv.useOptimized() )

e1 = cv.getTickCount()
for i in range( 5, 49,2 ):
    img2 = cv.medianBlur( img1 , i )
e2 = cv.getTickCount()
t = ( e2 - e1 )/cv.getTickFrequency()
print(t)

cv.setUseOptimized( False )
print( cv.useOptimized() )

e1 = cv.getTickCount()
for i in range( 5, 49,2 ):
    img2 = cv.medianBlur( img1 , i )
e2 = cv.getTickCount()
t = ( e2 - e1 )/cv.getTickFrequency()
print(t)

# Result I got is 0.521107655 seconds 
