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

def createModel():  
    dataset = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']
    train_sizes = np.ones((24,), dtype = int)
    test_sizes = np.ones((24,), dtype = int)
    for n in dataset:
        for file in os.listdir('dataset_' + n + '_train'):
            i = Image.open('dataset_' + n + '_train/' +file)
            img = i.resize((28,28))
            gray_img = img.convert('L')
            gray_img.save('train_data' +'/' + file, "png")
            
    for n in dataset:
        for file in os.listdir('dataset_' + n + '_test'):
            i = Image.open('dataset_' + n + '_test/' + file)
            img = i.resize((28,28))
            gray_img = img.convert('L')
            gray_img.save('test_data' +'/' + file, "png")
            
    rr_model = keras.Sequential()
    rr_model.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 1)))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Flatten())
    rr_model.add(keras.layers.Dense(64, activation='relu'))
    rr_model.add(keras.layers.Dense(10)) # the number of labels will replace the ten 
    
    data_list = os.listdir('train_data')
    train_data = np.array([np.array(Image.open('train_data'+ '/' + img)).flatten()
                for img in data_list],'f')
    
    train_labels = np.ones((len(data_list),), dtype = int)
    temp = 0
    for val in range(len(train_sizes)):
        train_labels[temp:train_sizes[val]] = val 
        temp = train_sizes[val] + 1
         
    data_list = os.listdir('test_data')
    test_data = np.array([np.array(Image.open('test_data'+ '/' + img)).flatten()
                for img in data_list],'f')
    
    test_labels = np.ones((len(os.listdir('dataset_wo_train')),), dtype = int)
    temp = 0
    for val in range(len(test_sizes)):
        test_labels[temp:test_sizes[val]] = val 
        temp = test_sizes[val] + 1
        

    train_imgs , train_labels = shuffle(train_data, train_labels, random_state = 2)
    test_imgs , test_labels = shuffle(test_data, train_labels, random_state = 2)

    #split the data into training and testing data
    # train_imgs, test_imgs, train_labels, test_labels = train_test_split(shuffled_data, shuffled_labels, test_size = 0.20, random_state = 2)
    rr_model.compile(optimizer='adam',
                loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                metrics=['accuracy'])
    history = rr_model.fit(train_imgs, train_labels, epochs=45, 
                        validation_data=(test_imgs, test_labels))
    print(history)
    rr_model.summary()

    rr_model.save("characterRec.h5")
    
def main():
    createModel()
    
if __name__ == '__main__':
   main()