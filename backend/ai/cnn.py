from ctypes import resize
from datetime import datetime
import json
import os
import tensorflow as tf
from tensorflow import keras
from keras.utils import np_utils
from matplotlib import pyplot
import numpy as np
from random import shuffle
from keras.utils import np_utils
from PIL import Image
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split
import random

class CNN():
  def __init__(self, name):
    self.CNN = keras.Sequential()
    self.version = name
  
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
    self.CNN.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.BatchNormalization())
    
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.BatchNormalization())
    
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.BatchNormalization())

    self.CNN.add(keras.layers.Flatten())
    self.CNN.add(keras.layers.Dense(16, activation='relu'))
    self.CNN.add(keras.layers.Dense(10, activation = 'softmax'))
    return self.CNN
  
  """
    Function trian_model:
      trains our model and output the accuraccy and Loss, to help understand and better the model
    Parameters:
      None
    Return:
      our trainned model
  """
  
  def trian_model(self, modelName):
    self.CNN.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

    history = self.CNN.fit(self.train_image, self.train_labels, epochs=45, 
                    validation_data=(self.test_images, self.test_labels))
    print(history)
    self.test_loss, self.test_acc = self.CNN.evaluate(self.test_images,  self.test_labels, verbose=2)
    print('Accuraccy: ' + str(self.test_acc))
    print('Loss: ' + str(self.test_loss))
    # e = [i for i in range(1, 45+1)]
    # pyplot.plot(test_acc, test_loss)
    # pyplot.title('accuraccy vs losses')
    # pyplot.show()
    self.CNN.save(modelName + '.h5')
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
  def getData(self, image_path):
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

    img_matrix = np.array([np.array(Image.open('resized'+ '/' + im2)).flatten()
              for im2 in resized_img_list],'f')
    
    img_label = np.ones((num_resized,), dtype = int)  
    img_label[0:] = 0
    
    data, labels = shuffle(img_matrix, img_label, random_state = 2)
    our_data = [img_matrix,img_label]
    
    (x,y) = (our_data[0], our_data[1])
    self.train_image, self.test_images, self.train_labels, self.test_labels = train_test_split(x, y, test_size = 0.34, random_state = 4)

    self.train_image /= 255
    self.test_images /= 255

    self.train_image = self.train_image.reshape(self.train_image.shape[0], 28, 28, 1)
    self.test_images = self.test_images.reshape(self.test_images.shape[0], 28, 28, 1)

    self.train_image =self.train_image.astype('float32')
    self.test_images = self.test_images.astype('float32')

    print('\nself.train_images.shape: {}, of {}'.format(self.train_image.shape, self.train_image.dtype))
    print('self.test_images.shape: {}, of {}'.format(self.test_images.shape, self.test_images.dtype))
  
  def storeData(self):
        date = datetime.now()
        with open("models_data.json", "r+") as file:
            data= json.load(file)
        record = {"version" : self.version, "date" : str(date), 'accuracy': str(self.test_acc) +'%', 'loss': str(self.test_loss) + '%'}
        data["data"].append(record)
        with open("models_data.json", "w") as w_file:
            json.dump(data, w_file, indent = 4)