import numpy as np
import cv2 as cv

img = cv.imread('roi.jpg')
assert img is not None, "file could not be read, check with os.path.exists()"

#Accessing and Modifying pixel values 

px = img[100,100]
print( px )

# accessing only blue pixel 
blue = img[100,100,0]
print( blue )

img[100,100] = [255,255,255]
print( img[100,100] )

# accessing RED value
red = img.item(10,10,2)
print( red )

# modifying RED value 
img.itemset(( 10,10,2), 100 )
print( img.item( 10,10,2 ))

# Accessing Image Properties 
print('Shape , Size , Dtype')
print( img.shape )
print( img.size )
print( img.dtype ) 

ball = img[280:340, 330:390]
#img[ 273:333, 100:160 ] = ball 

#Splitting and Merging image Channels 
b,g,r = cv.split(img) 
b = img[:,:,0]

# the red pixels to zero 
img[:,:,2] =0 
cv.imshow('Display img', img ) 
key = cv.waitKey(0)

img = cv.merge((b,g,r))

cv.imshow('Display img', img ) 
key = cv.waitKey(0)
