import os
from tensorflow import keras
from matplotlib import pyplot
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
        self.characters = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']
        self.k49_classmap = pd.read_csv('data/input/k49_classmap.csv')
        self.k49_classmap.head()
        self.version = name
    
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
        
        
    def createDatasets(self):
        """
            Move the image into two folders
            Train_data and Test_data
        """
        print(len(os.listdir('data')))
        my_dir = os.listdir('data')
        resized_img_list = 0
        lengths = []
        for file in my_dir:
            if(file != 'input' and file != 'create_all_dataset.py'):
                lengths.append(len(os.listdir('data'+'/'+file)))
                for img in os.listdir('data'+'/'+file):
                    i = Image.open('data'+'/'+file+'/'+ img)
                    image = i.resize((28,28))
                    gray_img = image.convert('L')
                    gray_img.save('resized' +'/' + img, "jpeg")
                    resized_img_list = os.listdir('resized')
                print(lengths[len(lengths)-1])
        print('\nLengths: ')
        print(lengths)
        print('\nImages: ')
        print(resized_img_list)    

        num_resized = len(resized_img_list)
        print(resized_img_list)
        print('\nsize: ' + str(num_resized))

        img_matrix = np.array([np.array(Image.open('resized'+ '/' + im2)).flatten()
                    for im2 in resized_img_list],'f')

        img_label = np.ones((len(img_matrix),), dtype = int)  
        val = 0
        bound = 0
        for size in lengths:
            img_label[bound:bound + size] = val
            val+=0
            bound += size

        data, labels = shuffle(img_matrix, img_label, random_state = 2)
        our_data = [data,labels]

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
        self.rr_model.compile(optimizer='adam',
                    loss=categorical_crossentropy,
                    metrics=[categorical_accuracy])
        
        history = self.rr_model.fit(self.train_image, self.train_labels, epochs=45, 
                            validation_data=(self.test_images, self.test_labels))
        
        # history = self.rr_model.fit(self.x_train, self.y_train, epochs=25, validation_data=(self.x_val, self.y_val))
        # print(history.history)
        self.rr_model.summary()
        
        self.test_loss, self.test_acc = self.rr_model.evaluate(self.x_val, self.y_val, verbose=2)
        
        print('Accuraccy: ' + str(self.test_acc))
        print('Loss: ' + str(self.test_loss))
        self.rr_model.save("characterRec.h5")
    
    def storeData(self):
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
    # obj.getData()
    obj.createDatasets()
    obj.createModel()
    obj.trainModel()
    obj.storeData()