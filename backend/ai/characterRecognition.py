from logging.config import valid_ident
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
        self.img_size = (150, 150)
        
        train_data = tf.keras.utils.image_dataset_from_directory(train, shuffle = True, batch_size = train_size, image_size = img_size)
        val_data = tf.keras.utils.image_dataset_from_directory(val, shuffle = True, batch_size = val_size, image_size = img_size)

        val_batches = tf.data.experimental.cardinality(val_data)
        test_data = val_data.take(val_batches // 5)
        val_data = val_data.skip(val_batches // 5)
        
        auto = tf.data.AUTOTUNE

        self.train_data = train_data.prefetch(buffer_size=auto)
        self.val_data = val_data.prefetch(buffer_size=auto)
        self.test_data = test_data.prefetch(buffer_size=auto)
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
        sequentail_layer = tf.keras.Sequential([
            tf.keras.layers.RandomFlip('horizontal'),
            tf.keras.layers.RandomRotation(0.3),
        ])
        
        #create base model
        base_model = tf.keras.application.ResNet50V2(input_shape  = self.img_size, include_top = False, weight='imagenet')
        
        #freeze the convolutional base
        base_model.trainable = False
        base_model.summary()
        image_batch, label_batch = next(iter(self.train_data))
        feature_batch = base_model(image_batch)
        
        #Adding a classification head
        global_average_layer = tf.keras.layers.GlobalAveragePooling2D()
        feature_batch_average = global_average_layer(feature_batch)
        
        #Apply the dense layer
        prediction_layer = tf.keras.layers.layers.Dense(1, activation = 'softmax')
        
        input = tf.keras.Input(shape = self.img_size + (3))
        x = sequentail_layer(input)
        x = base_model(x, training=False)
        x = global_average_layer(x)
        x = tf.keras.layers.Dropout(0.2)(x)
        outputs = prediction_layer(x)
        self.model = tf.keras.Model(input, outputs)
        
        #compile the model
        base_learning_rate = 0.0001
        self.model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=base_learning_rate),
              loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=['accuracy'])
        self.model.summary()
        
    """
        tarinModel: 
            Trains the model
        parameters:
            val: for when we train again
        returns:
            Nothing
        Set varable model
            histroy to help we train again
    """ 
    def trainModel(self, val):
        print('\nTraining the model......')
        history = self.model.fit(
            self.train_data,
            epochs = self.e,
            validation_data=self.val_data
        )
    
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
