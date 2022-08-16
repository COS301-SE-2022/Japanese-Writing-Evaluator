import io
from PIL import Image , ImageFilter 
import tensorflow as tf
import numpy as np
from random import seed
from random import randint
import matplotlib.pyplot as plt
from numpy import expand_dims
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from matplotlib import pyplot
import cv2
class testing_dataset: 

    

    #create the folders for the testing dataset
    #rotate_15
    def blur(self,blurr,counter): 
        #blur
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            
            gaussImage = manipulated.filter(ImageFilter.GaussianBlur(blurr))
            for j in range (0,10):
                gaussImage.save('result_'+str(counter) + '.png')
                counter = counter + 1
    
    def rotate_image_(self,angle,counter):
        
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            manipulated = manipulated.rotate(angle)
            for j in range (0,10):
                manipulated.save('picture_'+str(counter) + '.png')
                counter = counter + 1

    def zoom_image(self,counter): 
       
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            img_buf = io.BytesIO()
            datagen = ImageDataGenerator()
            data = img_to_array(manipulated)
            samples = expand_dims(data,0)
            datagen = ImageDataGenerator(zoom_range=[0.5,1.5])
            it = datagen.flow(samples, batch_size = 1)
            pyplot.subplot(330+1+i)
            batch = it.next()
            image = batch[0].astype('uint8')
            manipulated = Image.fromarray(image)
            for j in range (0,10):
                manipulated.save('picture_'+str(counter) + '.png')
                counter = counter + 1

    def shear(self,counter):
        
        for i in range (1,9):
            img = cv2.imread("./pictures/test_"+str(i)+".png")
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            plt.axis('off')
            plt.imshow(img)
            plt.show()
            rows, cols, dim = img.shape
            M = np.float32([[1, 0.5, 0],
             	[0, 1  , 0],
            	[0, 0  , 1]])
               
            sheared_img = cv2.warpPerspective(img,M,(int(cols*1.2),int(rows*1.2)))
            plt.axis('off')
            for j in range (0,10):
                plt.imsave("picture_"+ str(counter)+ ".png", sheared_img)
                counter = counter + 1

    def transpose_90(self,counter): 
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            manipulated = manipulated.transpose(Image.ROTATE_90)
            for j in range (0,10):
                manipulated.save('picture_'+str(counter) + '.png')
                counter = counter + 1

    def transpose_270(self,counter):
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            manipulated = manipulated.transpose(Image.ROTATE_270)
            for j in range (0,10):
                manipulated.save('picture_'+str(counter) + '.png')
                counter = counter + 1
        
if __name__ == '__main__':
    testing_dataset = testing_dataset()
    #testing_dataset.rotate_image()
    counter = 0
    #rotate_1
    testing_dataset.rotate_image_(15,counter)
    #rotate_30
    testing_dataset.rotate_image_(30,counter)
    #rotate_45
    testing_dataset.rotate_image_(45,counter)
    #rotate_-15
    testing_dataset.rotate_image_(-15,counter)
    #rotate_-30
    testing_dataset.rotate_image_(-30,counter)
    #rotate_-45
    testing_dataset.rotate_image_(-45,counter)
    testing_dataset.zoom_image(counter)
    testing_dataset.shear(counter)
    testing_dataset.transpose_90(counter)
    testing_dataset.transpose_270(counter)
    testing_dataset.blur(1,counter)
    testing_dataset.blur(2,counter)
    testing_dataset.blur(3,counter)
    print(counter)
    print("done")

