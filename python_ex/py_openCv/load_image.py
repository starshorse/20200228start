# https://ddolcat.tistory.com/958

import cv2 
import numpy as np 

def wait4input( cv2):
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def convertImg( img ):
    # 4. OpenCV이미지 사이즈 조절(확대및 축소) 
    w = img.shape[1] # width
    h = img.shape[0] # height 
    print(w)
    print(h)
    width = round(w/4)
    height = round(h/4)
    return cv2.resize( img, ( width, height )) 


img = cv2.imread('./lion_1920.jpg')
print( type(img)) 

img = convertImg(img)

cv2.imwrite('./lion_480.jpg', img ) 

imgType = [ cv2.IMREAD_GRAYSCALE , cv2.IMREAD_ANYCOLOR , cv2.IMREAD_ANYDEPTH, cv2.IMREAD_LOAD_GDAL ]; 
for idx, img_type in enumerate(imgType):
    img = cv2.imread('./lion_480.jpg',img_type )
    cv2.imwrite(f'./lion_480_{idx}.jpg',img) 
    cv2.imshow('img', img )
    
wait4input(cv2)
# OpenCV 이미지 붙이기 
img_list = []

for i in range(4):
    img = cv2.imread(f'./lion_480_{i}.jpg')
    img_list.append(img)


img = cv2.hconcat(img_list)
cv2.imshow('img', img)
wait4input( cv2 )
img = cv2.vconcat(img_list)
cv2.imshow('img', img)
wait4input( cv2 )

# 5. OpenCV img brightness control.. 
# numpy.clip(
img_list_b = [ img_list[1]]

#img_list_b.append( img_list[1] + 50 )
#img_list_b.append( img_list[1] - 50 )
img_list_b.append( np.clip( img_list[1].astype('int32') + 50, 0, 255 ).astype('uint8') )
img_list_b.append( np.clip( img_list[1].astype('int32') - 50, 0, 255 ).astype('uint8') )

img = cv2.hconcat(img_list_b )
cv2.imshow('img',img )
wait4input( cv2 )

# 6. OpenCV 이미지 회전 
height, width , channel =  img_list[1].shape 
matrix = cv2.getRotationMatrix2D( (width /2 , height /2) , 45, 0.5 )
dst = cv2.warpAffine( img_list[1], matrix, ( width, height ))

cv2.imshow("1.이미지회전", dst ) 
wait4input( cv2 )
# 7. OpenCV 이미지 대칭(Flip) 

img_list_flip = [ img_list[1]]
img_list_flip.append( cv2.flip( img_list[1], 0)) # 1. image flip
img_list_flip.append( cv2.flip( img_list[1], -1)) # 2. image flip top/bottom
img_list_flip.append( cv2.flip( img_list[1], 2)) # 3. image flip left/right

img  = cv2.hconcat( img_list_flip )
cv2.imshow('flip', img ) 
wait4input( cv2 ) 

# 8.OpenCV 이미지 자르기(Slice) 
img = img_list_flip[1][50:200, 100:250].copy()
cv2.imshow('slice', img )
wait4input( cv2 )

# 9. OpenCV 이미지 색상 공간 변환
img1 = img
img2 = cv2.cvtColor( img1, cv2.COLOR_BGR2GRAY ) 
height, width, channel = img1.shape 
height2, width2 = img2.shape 

print( channel) 


