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
count = 0 
#rotate_15
def rotate_image(image, angle):
    for i in range (0,3):
        manipulated =Image.open('./pictures/test_'+ str(i) + '.png')
        manipulated = manipulated.rotate(15)
        for j in range (0,10):
            manipulated.save('picture_'+str(count) + '.png')
            count = count + 1