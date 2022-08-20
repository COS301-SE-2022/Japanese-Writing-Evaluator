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
class training: 

    """
    blur function:
        takes the different images in pictures folder and blurs them
    request body: 
        blurr: the degree for GaussianBlur
        counter: the counter of how many images are in the training folder
    return:
        counter
""" 
    def blur(self,blurr,counter): 
        #blur
        for i in range (0,38):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            
            gaussImage = manipulated.filter(ImageFilter.GaussianBlur(blurr))
            for j in range (0,100):
                gaussImage.save('./training/picture_'+str(counter) + '.png')
                counter = counter + 1
        return counter

    """
   rotate_image_:
        takes the different images in pictures folder and roates them by a degree
    request body: 
        angle: the degree for the rotation
        counter: the counter of how many images are in the training folder
    return:
        counter
"""  
    def rotate_image_(self,angle,counter):
        
        for i in range (0,38):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            manipulated = manipulated.rotate(angle)
            for j in range (0,100):
                manipulated.save('./training/picture_'+str(counter) + '.png')
                counter = counter + 1
        return counter

    """
   zoom_image:
        takes the different images in pictures folder and zooms in on them 
    request body: 
       
        counter: the counter of how many images are in the training folder
    return:
        counter
""" 
    def zoom_image(self,counter): 
       
        for i in range (0,38):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            img_buf = io.BytesIO()
            datagen = ImageDataGenerator()
            data = img_to_array(manipulated)
            samples = expand_dims(data,0)
            datagen = ImageDataGenerator(zoom_range=[0.5,1.5])
            it = datagen.flow(samples, batch_size = 1)
            pyplot.subplot(330+1+3)
            batch = it.next()
            image = batch[0].astype('uint8')
            manipulated = Image.fromarray(image)
            for j in range (0,100):
                manipulated.save("./training/picture_"+ str(counter)+ ".png")
                counter = counter + 1
        return counter