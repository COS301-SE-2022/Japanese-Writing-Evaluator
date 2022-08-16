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
class testing_dataset: 

    count = 0 

    #create the folders for the testing dataset
    #rotate_15
    def rotate_image(self,angle):
        self.count = self.count + 1
        for i in range (0,3):
            manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
            manipulated = manipulated.rotate(15)
            for j in range (0,10):
                manipulated.save('picture_'+str(self.count) + '.png')
                self.count = self.count + 1


        
if __name__ == '__main__':
    testing_dataset = testing_dataset()
    #testing_dataset.rotate_image()
    counter = testing_dataset.count
    testing_dataset.rotate_image(15)
    print(counter)
    print("done")

