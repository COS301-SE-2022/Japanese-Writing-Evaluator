# Source: TensorFlowhub links:
# - https://www.tensorflow.org/tutorials/images/transfer_learning_with_hub

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
import tensorflow_hub as hub
from keras.losses import categorical_crossentropy
from keras.metrics import categorical_accuracy
from datetime import datetime
import json

class CharacterRecognition():
    def __init__(self, name, num):
        self.version = name
        self.e = 10
        self.num_classes = num
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
        print("\nCreating Data.....")
        train = os.path.join(path, 'train')
        val = os.path.join(path, 'validation')
        self.img_size = (224, 224)
        
        train_data = tf.keras.utils.image_dataset_from_directory(train, shuffle = True, batch_size = train_size, image_size = self.img_size)
        val_data = tf.keras.utils.image_dataset_from_directory(val, shuffle = True, batch_size = val_size, image_size = self.img_size)

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
        base_model = tf.keras.applications.ResNet50V2(input_shape = self.img_size + (3,), include_top = False)
        self.model = tf.keras.Sequential([
            base_model,
            tf.keras.layers.Dense(self.num_classes, activation = "softmax")
        ])
        self.model.trainable=False
        self.model.summary()
              
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
    def trainModel(self):
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
    cr = CharacterRecognition(version, 0)
    cr.createDatasets('../../../../dataset', 57000, 19650)
    cr.createModel()
    cr.trainModel()
    cr.storeData()