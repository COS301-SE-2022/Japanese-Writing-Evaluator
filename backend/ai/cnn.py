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
    self.e = 50
  
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
    self.CNN.add(keras.layers.Dense(64, activation='relu'))
    self.CNN.add(keras.layers.Dense(4, activation = "sigmoid "))
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
    self.CNN.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
    
    self.CNN.fit(self.x_train, self.y_train, epochs=self.e, validation_data=(self.x_val, self.y_val))
    self.CNN.summary()
    self.test_loss, self.test_acc = self.CNN.evaluate(self.x_val, self.y_val, verbose=2)
        
    print('Accuraccy: ' + str(self.test_acc))
    print('Loss: ' + str(self.test_loss))
   
    self.CNN.save(modelName + '.h5')
    return self.CNN
  
  def creatingImages(self):
    print('\nCreating Imges Array....')
    my_dir = os.listdir('data/strokes/dataset_a')
    resized_img_list = 0
    lengths = []
    for file in my_dir:
        lengths.append(len(os.listdir('data/strokes/dataset_a'+'/'+file)))
        for img in os.listdir('data/strokes/dataset_a'+'/'+file):
            i = Image.open('data/strokes/dataset_a'+'/'+file+'/'+ img)
            image = i.resize((28,28))
            gray_img = image.convert('L')
            gray_img.save('data/resized' +'/' + img, "jpeg")
            resized_img_list = os.listdir('data/resized')
        print(file)
        print(lengths[len(lengths)-1])

    self.img_matrix = np.array([np.array(Image.open('data/resized'+ '/' + im2)).flatten()
                for im2 in resized_img_list],'f')
    
  def createLabels(self):
    self.labels = np.ones((len(self.img_matrix),), dtype = int)
    kanji = os.listdir('data/strokes/dataset_a')
    bound = 0
    val = 0
    for files in kanji:
        size = len(os.listdir('data/strokes/dataset_a/' + files))
        print(files, str(val), str(size))
        self.labels[bound:bound + size] = val
        val+= 1
        bound += size
    print(self.labels)
    print('\nLabels: ', str(len(self.labels)))
    print('\nImages: ', str(len(self.img_matrix)))
  def createDatasets(self):
    data, labels = shuffle(self.img_matrix, self.labels, random_state = 2)
    our_data = [data, labels,]

    (x,y) = (our_data[0], our_data[1])
    train_img, test_img, self.y_train, self.y_val = train_test_split(x, y, test_size = 0.10, random_state = 2)

    train_img /= 255
    test_img /= 255

    test_images = test_img.reshape(test_img.shape[0], 28, 28, 1)
    train_image = train_img.reshape(train_img.shape[0], 28, 28, 1)

    self.x_train =train_image.astype('float32')
    self.x_val = test_images.astype('float32')

    print('\nself.train_images.shape: {}, of {}'.format(self.x_train.shape, self.x_train.dtype))
    print('self.test_images.shape: {}, of {}'.format(self.x_val.shape, self.x_val.dtype))

  def storeData(self):
    date = datetime.now()
    with open("models_data.json", "r+") as file:
        data= json.load(file)
    record = {"version" : self.version, "date" : str(date), 'accuracy': str(self.test_acc) +'%', 'loss': str(self.test_loss) + '%'}
    data["data"].append(record)
    with open("models_data.json", "w") as w_file:
        json.dump(data, w_file, indent = 4)
  
if __name__ == '__main__':
  name = input("version name: ")
  model = CNN(name)
  model.creatingImages()
  model.createLabels()
  model.createDatasets()
  model.trian_model(name)
  model.storeData()