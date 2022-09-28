import os
from tensorflow import keras
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
from random import shuffle
from PIL import Image
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split
import pandas as pd
from keras.losses import categorical_crossentropy
from keras.metrics import categorical_accuracy
from datetime import datetime
import json

class CharacterRecognition():
    def __init__(self, name):
        self.version = name
        self.e = 50
        
    def one_hot_encoding(self,y):
        y_res = np.zeros((len(y), 49))
        for i in range(len(y)):
            y_res[i][y[i]] = 1
        return y_res    
    
    def getData(self):

        self.train_imgs = np.load('data/input/k49-train-imgs.npz')['arr_0']
        self.train_labels = np.load('data/input/k49-train-labels.npz')['arr_0']
        self.test_imgs = np.load('data/input/k49-test-imgs.npz')['arr_0']
        self.test_labels = np.load('data/input/k49-test-labels.npz')['arr_0']
        
        self.train_imgs = np.expand_dims(self.train_imgs, axis=-1)
        self.test_imgs = np.expand_dims(self.test_imgs, axis=-1)
        
        self.x_train, self.x_val, self.y_train, self.y_val = train_test_split(self.train_imgs, self.train_labels, test_size=0.10)
        self.y_train = self.one_hot_encoding(self.y_train)
        self.y_val = self.one_hot_encoding(self.y_val)
        
    def creatingImages(self):
        print('\nCreating Imges Array....')
        my_dir = os.listdir('data/kanji')
        resized_img_list = os.listdir('resized')
        lengths = []
        for file in my_dir:
            lengths.append(len(os.listdir('data/kanji'+'/'+file)))
            for img in os.listdir('data/kanji'+'/'+file):
                i = Image.open('data/kanji'+'/'+file+'/'+ img)
                image = i.resize((28,28))
                gray_img = image.convert('L')
                gray_img.save('resized_kanji' +'/' + img, "jpeg")
                resized_img_list = os.listdir('resized_kanji')
            print(file)
            print(lengths[len(lengths)-1])

        self.img_matrix = np.array([np.array(Image.open('resized_kanji'+ '/' + im2)).flatten()
                    for im2 in resized_img_list],'f')
    def createLabels(self):
        self.labels = np.ones((len(self.img_matrix),), dtype = int)
        kanji = os.listdir('data/kanji')
        bound = 0
        val = 0
        for files in kanji:
            size = len(os.listdir('data/kanji/' + files))
            self.labels[bound:bound + size] = val
            val+= 1
            bound += size
       
    def createDatasets(self):
        data, labels = shuffle(self.img_matrix, self.labels, random_state = 2)
        our_data = [self.img_matrix, self.labels,]

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
    
    """
        Creates our convolutional Neural Network 
        Description:
            leyers:
            3 Convolution layers
            3 Pool layers
            2 Dense layers on top to perform classification with flatten layer that flattens the input tensor from 3D to 1D
            model type:
                Sequantial
            Activation Function:
                reLU (more reliable and accelarates the convergence)
    """  
    def createModel(self):  
        print('\nCreating the model......')   
        self.rr_model = keras.Sequential()
        self.rr_model.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Flatten())
        self.rr_model.add(keras.layers.Dense(64, activation='relu'))
        self.rr_model.add(keras.layers.Dense(49, activation = "softmax")) # the number of labels will replace the ten    
        


    def trainModel(self):
        print('\nTraining the model......')
        self.rr_model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
        
        self.rr_model.fit(self.x_train, self.y_train, epochs=self.e, validation_data=(self.x_val, self.y_val))
        self.rr_model.summary()
        self.test_loss, self.test_acc = self.rr_model.evaluate(self.x_val, self.y_val, verbose=2)
        
        print('Accuraccy: ' + str(self.test_acc))
        print('Loss: ' + str(self.test_loss))
        self.rr_model.save("kanji_model.h5")
    
    def storeData(self):
        print('\nStoring the data......')
        date = datetime.now()
        with open("models_data.json", "r+") as file:
            data= json.load(file)
        record = {"version" : self.version, "date" : str(date), 'accuracy': str(self.test_acc) +'%', 'loss': str(self.test_loss) + '%'}
        data["data"].append(record)
        with open("models_data.json", "w") as w_file:
            json.dump(data, w_file, indent = 4)
    
if __name__ == '__main__':
    version = input('model version: ')
    obj = CharacterRecognition(version)
    obj.creatingImages()
    obj.createLabels()
    obj.createDatasets()
    obj.createModel()
    obj.trainModel()
    obj.storeData()