import random
import daynight_helper
from daynight_threshold import estimate_label 

test_data_path = 'images/test'
test_data = daynight_helper.load_dataset(test_data_path)
test_data = daynight_helper.standardize_inputs(test_data)

random.shuffle(test_data)

threshold = 113

correctly_classified = []
misclassified = []

for i in range(0, len(test_data)):
    img_data = test_data[i]
    pred, avg_brightness = estimate_label(img_data[0], threshold)
    #print('predicted ', pred)
    label = img_data[1]

    #print('label ', label)

    if pred == label:
        correctly_classified.append(img_data)
    else: 
        misclassified.append(img_data)

print('total : ', len(test_data))
print('Correct predictions: ', len(correctly_classified))
print('Misclassified: ', len(misclassified))
print('Accuracy ', len(correctly_classified)/len(test_data))        


num = 0
misclassified_img = misclassified[num]
plt.imshow(misclassified_img[0])
print('label ', misclassified_img[1])
