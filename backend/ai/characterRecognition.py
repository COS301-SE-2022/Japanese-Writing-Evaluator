from multiprocessing.spawn import prepare
import os
import tensorflow as tf
from tensorflow import keras
from matplotlib import pyplot
import numpy as np
from random import shuffle
from PIL import Image
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

class CharacterRecognition():
    def __init__(self):
        self.dataset = ['a','fu', 'ha', 'he', 'hi', 'i', 'ke','ki','ma', 'mo', 'n', 'na','ni', 'no', 'o', 'sa', 'se', 'su', 'te', 'to', 'we', 'ya']
        
    def createDatasets(self):
        """
            Move the image into two folders
            Train_data and Test_data
        """
        train_labels = []
        test_labels =[]
        val = -1
        for n in self.dataset:
            val +=1
            for file in os.listdir('data/dataset_' + n + '_train'):
                i = Image.open('data/dataset_' + n + '_train/' +file)
                img = i.resize((32,32))
                gray_img = img.convert('L')
                gray_img.save('train_data' +'/' + file, ".jpeg")
                train_labels.append(val)
        var = -1        
        for n in self.dataset:
            var += 1
            for file in os.listdir('data/dataset_' + n + '_test'):
                i = Image.open('data/dataset_' + n + '_test/' + file)
                img = i.resize((32,32))
                gray_img = img.convert('L')
                gray_img.save('test_data' +'/' + file, ".jpeg")
                test_labels.append(var)
                
        """
        Creating two arrays train_data and train labels
        """
        train_data = np.array([np.array(Image.open('train_data'+ '/' + img)).flatten()
                    for img in os.listdir('train_data')],'f') 
        print('train  data size:')
        print(len(train_data))
        
        test_data = np.array([np.array(Image.open('test_data'+ '/' + img)).flatten()
                    for img in os.listdir('test_data')],'f')
        
        self.train_imgs , self.train_labels = shuffle(train_data, train_labels, random_state = 2)
        self.test_imgs , self.test_labels = shuffle(test_data, test_labels, random_state = 2)
        
        self.train_imgs /= 255
        self.test_imgs /= 255
        
        self.train_imgs = self.train_imgs.reshape(self.train_imgs.shape[0], 32, 32, 1)
        self.test_imgs = self.test_imgs.reshape(self.test_imgs.shape[0], 32, 32, 1)
    
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
            
        self.rr_model = keras.Sequential()
        self.rr_model.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 1)))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
        self.rr_model.add(keras.layers.MaxPooling2D((2, 2)))

        self.rr_model.add(keras.layers.Flatten())
        self.rr_model.add(keras.layers.Dense(64, activation='relu'))
        self.r_model.add(keras.layers.Dense(len(self.dataset))) # the number of labels will replace the ten    
        


    def trainModel(self):
        self.rr_model.compile(optimizer='adam',
                    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                    metrics=['accuracy'])
        history = self.rr_model.fit(self.train_imgs, self.train_labels, epochs=45, 
                            validation_data=(self.test_imgs, self.test_labels))
        print(history)
        self.rr_model.summary()
        test_loss, test_acc = self.rr_model.evaluate(self.test_imgs, self.test_labels, verbose=2)
        print('Accuraccy: ' + str(test_acc))
        print('Loss: ' + str(test_loss))
        self.rr_model.save("characterRec.h5")
        
    
if __name__ == '__main__':
    obj = CharacterRecognition()
    obj.createDatasets()
    obj.createModel()
    obj.trainModel()