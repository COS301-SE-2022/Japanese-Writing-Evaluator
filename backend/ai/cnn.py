# tensorflow imports
from cProfile import label
from ctypes import sizeof
from random import shuffle
from tkinter import Label
from PIL import Image
import tensorflow as tf
from tensorflow import keras
import matplotlib.pylot as plt
import numpy as np
import os
from sklearn.model_selection import train_test_split
from keras.utils import np_utils

"""
  load training  data but that makes the self.CNN specific
  so now we will have a different file to load data and create new self.CNN
"""


"""
  Building the self.CNN:
    layers:
      activation - function is ReLU(more reliable and accelarates the convergence)
      we have 3 hidden layers:
        2 convolutional layer - main layer of the self.CNN 
        2 poolin layer - 
        1 fully connected layer - connects every thing together the input and output
    Type of self.CNN: 
      we are using a Sequential self.CNN
"""
class CNN():
  def __init__(self):
    self.CNN = keras.Sequential()
    self.train_image 
    self.test_images
    self.Y_train
    self.Y_test
  
  def create_CNN(self):
    self.CNN.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))

    self.CNN.add(keras.layers.Flatten())
    self.CNN.add(keras.layers.Dense(64, activation='relu'))
    self.CNN.add(keras.layers.Dense(10))
    return self.CNN
  
  def trian_model(self):
    self.CNN.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

    history = self.CNN.fit(self.train_images, self.train_labels, epochs=10, 
                    validation_data=(self.test_images, self.test_labels))
    print(history)
    test_loss, test_acc = self.CNN.evaluate(self.test_images,  self.test_labels, verbose=2)
    print('Accuraccy: ' + test_acc)
    print('Loss: ' + test_loss)
    CNN.save()
    return self.CNN
  
  def create_dataset(self, img_path, resized_data_path):
    list_img = os.listdir(img_path)
    num_img = len(list_img)
    print(list_img)
    print('\nsize: ' + str(num_img))
    
    for file in list_img:
      i = Image.open(img_path + '/' +file)
      img = i.resize((200,200))
      gray_img = img.convert('L')
      gray_img.save(resized_data_path +'/' + file, "jpeg")

    resized_img_list = os.listdir(resized_data_path)
    num_resized = len(resized_img_list)
    print(resized_img_list)
    print('\nsize: ' + str(num_resized))
    
    img_matrix = np.array([np.array(Image.open('resized_data'+ '/' + im2)).flatten()
              for im2 in resized_img_list],'f')
    img_label = np.ones((num_img,), dtype = int)  
    img_label[0:20] = 0# a
    img_label[20:] = 1# ab

    data,Labels = shuffle(img_matrix, img_label, random_state = 2)
    our_data = [data,Labels]
    
    img=img_matrix[30].reshape(200,200)
    plt.imshow(img)
    plt.imshow(img,cmap='gray')
    print (our_data[0].shape)
    print (our_data[1].shape)
    
    (x,y) = (our_data[0], our_data[1])
    self.train_image, self.test_images, train_labels, test_labels = train_test_split(x, y, test_size = 0.34, random_state = 4)
    self.train_image = self.train_image.reshape(self.train_image.shape[0], 1, 200, 200)
    self.test_images = self.test_images.reshape(self.test_images.shape[0], 1, 200, 200)

    self.train_image =self.train_image.astype('float32')
    self.test_images = self.test_images.astype('float32')

    self.train_image /= 255
    self.test_images /= 255
    
    print('self.train_image shape:', self.train_image.shape)
    print(self.train_image.shape[0], 'train samples')
    print(self.test_images.shape[0], 'test samples')
    
    self.Y_train = np_utils.to_categorical(train_labels, 2)
    self.Y_test = np_utils.to_categorical(test_labels, 2)

    i = 10
    plt.imshow(self.train_image[i, 0], interpolation='nearest')
    print("label : ", self.Y_train[i,:])