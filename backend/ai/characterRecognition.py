# Source: TensorFlowhub links:
# - https://www.tensorflow.org/tutorials/images/transfer_learning_with_hub

import os
import tensorflow as tf
import tensorflow_hub as hub
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
            none
        sets varaibles:
            train_data
            test_data
            test_data
    """             
    def createDatasets(self, path):
        print("\nCreating Data.....")
        train = os.path.join(path, 'train')
        test = os.path.join(path, 'test')
        self.img_size = (224, 224)
        
        train_data = tf.keras.utils.image_dataset_from_directory(
            train, 
            shuffle = True, 
            batch_size = 1, 
            image_size = self.img_size,
            validation_split = 0.3,
            subset = "training",
            seed = 369
            )
        test_data = tf.keras.utils.image_dataset_from_directory(
            test, 
            shuffle = True, 
            batch_size = 1, 
            image_size = self.img_size,
        )   
        val_data = tf.keras.utils.image_dataset_from_directory(
            train, 
            shuffle = True, 
            batch_size = 1, 
            image_size = self.img_size,
            validation_split = 0.3,
            subset = "validation",
            seed = 369
        ) 

        self.data_classes = train_data.class_names
        
        print("Classes: ", self.data_classes)
        
        print('\nTrain Batches: %d' % tf.data.experimental.cardinality(train_data))
        print('Test Batches: %d' % tf.data.experimental.cardinality(test_data))
        print('Val Batches: %d' % tf.data.experimental.cardinality(val_data))

        
        auto = tf.data.AUTOTUNE

        self.train_data = train_data.prefetch(buffer_size=auto)
        self.test_data = test_data.prefetch(buffer_size=auto)
        self.val_data = val_data.prefetch(buffer_size=auto)
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
            None
        Set varable model
    """  
    def createModel(self):  
        print('\nCreating the model......')  
      
        img_shape = self.img_size + (3,)
        self.base_model = tf.keras.applications.MobileNetV2(
            input_shape=img_shape,
            include_top=False,
            weights='imagenet'
        )
        self.base_model.trainable = False
        self.base_model.summary()
        
        image_batch, label_batch = next(iter(self.train_data))
        feature_batch = self.base_model(image_batch)
        print(feature_batch.shape)

        global_average_layer = tf.keras.layers.GlobalAveragePooling2D()
        feature_batch_average = global_average_layer(feature_batch)
        print(feature_batch_average.shape)
        
        prediction_layer = tf.keras.layers.Dense(len(self.data_classes), activation="softmax")
        prediction_batch = prediction_layer(feature_batch_average)
        print(prediction_batch.shape)
      
      
        inputs = tf.keras.Input(shape=(224, 224, 3))
        x = self.base_model(inputs, training=False)
        x = global_average_layer(x)
        x = tf.keras.layers.Dropout(0.2)(x)
        outputs = prediction_layer(x)
        self.model = tf.keras.Model(inputs, outputs)
                 
        self.model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])
        self.model.summary()
        
    """
        tarinModel: 
            Trains the model
        parameters:
            val: for when we train again
        returns:
            None
        Set varable model
            histroy to help we train again
    """ 
    def trainModel(self):
        print('\nTraining the model......')
        history = self.model.fit(
            self.train_data,
            validation_data=self.val_data,
            epochs = self.e
        )
        
        print('\nTesing the model.....')
        self.test_loss, self.test_acc = self.model.evaluate(self.val_data, verbose=2)
        
        print('\nAccuraccy: ' + str(self.test_acc))
        print('Loss: ' + str(self.test_loss))
        
    
    """
        modelFitune: 
            Finetune the model
        parameters:
            none
        returns:
            None
        Set varable model
            histroy to help we train again
            updates the model varables
    """ 
    def modelFinetune(self):
        print('Fine tuning the model......')
        self.base_model.trainable = True
        print('Number of layer in the base model: ', len(self.model.layers))
        
        fta = 50

        for l in self.model.layers[:fta]:
            l.trainable = False
        
        self.model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(),
              metrics=['accuracy'])
        
        self.model.summary()
        hi = self.model.fit(
            self.train_data,
            validation_data=self.val_data,
            epochs = self.e,
            initial_epoch = self.history.epoch[-1]
        )
    
    """StoreData:
            Saves the accuracy, loss and name of the model to a .json file
        parameter:
            None
        returns:
            None
    """
    def storeData(self):
        print('\nStoring the data......')
        date = datetime.now()
        with open("models_data.json", "r+") as file:
            data= json.load(file)
        record = {"version" : self.version, "date" : str(date), 'accuracy': str(self.test_acc) +'%', 'loss': str(self.test_loss) + '%'}
        data["katakana"]["characterRecognition"].append(record)
        with open("models_data.json", "w") as w_file:
            json.dump(data, w_file, indent = 4)
        self.model.save('models/'+ self.version + '.h5')
        
    
if __name__ == '__main__':
    version = input('model version: ')
    path = input('data path: ')
    cr = CharacterRecognition(version, 0)
    cr.createDatasets(path)
    cr.createModel()
    cr.trainModel()
    cr.modelFinetune()
    cr.storeData()