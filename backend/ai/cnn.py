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
  def setData(self):
    self.train_image = np.load('input/k49-train-imgs.npz')['arr_0']
    self.train_labels = np.load('input/k49-train-labels.npz')['arr_0']
    self.test_images = np.load('input/k49-test-imgs.npz')['arr_0']
    self.test_labels = np.load('input/k49-test-labels.npz')['arr_0']