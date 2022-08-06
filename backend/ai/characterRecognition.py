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
        self.e = 10
    """
        createDataset: Creates the training, test and validation dataset.
        parameters:
            file name: the file with the dataset
        return:
            nothing
        sets varaibles:
            train_data
            test_data
            val_data
    """             
    def createDatasets(self, path, train_size, val_size):
        train = os.path.join(path, 'train')
        val = os.path.join(path, 'validation')
        img_size = (150, 150)
        
        train_data = tf.keras.utils.image_dataset_from_directory(train, shuffle = True, batch_size = train_size, image_size = img_size)
        val_data = tf.keras.utils.image_dataset_from_directory(val, shuffle = True, batch_size = val_size, image_size = img_size)

        test_img = val_data
        val_batches = tf.data.experimental.cardinality(val_data)
        test_data = val_data.take(val_batches // 5)
        val_data = val_data.skip(val_batches // 5)
        
        AUTOTUNE = tf.data.AUTOTUNE

        self.train_data = train_data.prefetch(buffer_size=AUTOTUNE)
        self.val_data = val_data.prefetch(buffer_size=AUTOTUNE)
        self.test_data = test_data.prefetch(buffer_size=AUTOTUNE)
        return None
    
    """
        createModel: 
            Downloads our model (ResNet V2)
            Freeze the model
            Add top-layers to the model:
                Added GlobalAvaragePooling2D
                Add a dense layer
            compile the model
        parameters:
            None
        returns:
            Nothing
        Set varable model
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
        
    """
        tarinModel: 
            Trains the model
        parameters:
            index: for when we train again
        returns:
            Nothing
        Set varable model
            histroy to help we train again
    """ 
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
    
    """
        modelFitune: 
            Finetune the model
        parameters:
            none
        returns:
            Nothing
        Set varable model
            histroy to help we train again
            updates the model varables
    """ 
    def modelFinetune(self):
        return None
    
    """StoreData:
            Saves the accuracy, loss and name of the model to a .json file
        parameter:
            None
        returns:
            Nothing
    """
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
