from ctypes import resize
import os
import tensorflow as tf
from tensorflow import keras
import matplotlib.pylot as plt
import numpy as np
from random import shuffle
from keras.utils import np_utils
from PIL import Image
from sklearn.model_selection import train_test_split

class CNN():
  def __init__(self):
    self.CNN = keras.Sequential()
    self.train_image = np.load('input/k49-train-imgs.npz')['arr_0']
    self.train_labels = np.load('input/k49-train-labels.npz')['arr_0']
    self.test_images = np.load('input/k49-test-imgs.npz')['arr_0']
    self.test_labels = np.load('input/k49-test-labels.npz')['arr_0']
  
  """
    Function create_CNN:
      Creates our convolutional Neural Network 
    Description:
      leyers:
        2 Convolutional layers
        2 Pool layers
      model type:
        Sequantial
      Activation Function:
        reLU (more reliable and accelarates the convergence)
    returns:
      a CNN model
  """
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
  
    """
    Function trian_model:
      trains our model and output the accuraccy and Loss, to help understand and better the model
    Parameters:
      None
    Return:
      our trainned model
    """
  
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
  
    """
    Working Progress it is suppose to train any data
      Function setData:
        set the trainning  and testing data
      Parameters:
        None
      Return:
        None
    """

  def getData(self, image_path, val):
    list_img = os.listdir(image_path)
    num_img = len(list_img)
    print(list_img)
    print('\nsize: ' + str(num_img))

    for file in list_img:
      i = Image.open(image_path + '/' +file)
      img = i.resize((28,28))
      gray_img = img.convert('L')
      gray_img.save('resized' +'/' + file, "jpeg")

    resized_img_list = os.listdir('resized')
    num_resized = len(resized_img_list)
    print(resized_img_list)
    print('\nsize: ' + str(num_resized))

    img_matrix = np.array([np.array(Image.open('resized_data'+ '/' + im2)).flatten()
              for im2 in resized_img_list],'f')
    
    img_label = np.ones((num_img,), dtype = int)  
    img_label[0:] = 0
    
    data,Labels = shuffle(img_matrix, img_label, random_state = 2)
    self.train_image = [data,Labels]
    
    if val == 0:
      self.train_image = self.train_image.reshape(self.train_image.shape[0], 28, 28, 1) 
      self.train_image =self.train_image.astype('float32')
      self.train_image /= 255
      self.train_labels = np_utils.to_categorical(self.train_labels, 2)
      
    elif val == 1:  
      self.test_images = self.test_images.reshape(self.test_images.shape[0], 28, 28, 1)
      self.test_images = self.test_images.astype('float32')
      self.test_images /= 255
      self.test_labels = np_utils.to_categorical(self.test_labels, 2)
      