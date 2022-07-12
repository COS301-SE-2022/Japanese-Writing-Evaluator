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
    dataset = ['a','fu', 'ha', 'he', 'hi', 'i', 'ke','ki','ma', 'mo', 'n', 'na','ni', 'no', 'o', 'sa', 'se', 'su', 'te', 'to', 'we', 'ya']
    train_sizes = np.ones((len(dataset),), dtype = int)
    test_sizes = np.ones((len(dataset),), dtype = int)
    v = 0
    for n in dataset:
        train_sizes[v] = len(os.listdir('data/dataset_' + n + '_train'))
        v +=1
        for file in os.listdir('data/dataset_' + n + '_train'):
            i = Image.open('data/dataset_' + n + '_train/' +file)
            img = i.resize((32,32))
            gray_img = img.convert('L')
            gray_img.save('train_data' +'/' + file, "jpeg")
    v = 0        
    for n in dataset:
        test_sizes[v] = len(os.listdir('data/dataset_' + n + '_test'))
        v +=1
        for file in os.listdir('data/dataset_' + n + '_test'):
            i = Image.open('data/dataset_' + n + '_test/' + file)
            img = i.resize((32,32))
            gray_img = img.convert('L')
            gray_img.save('test_data' +'/' + file, "jpeg")
     
    print('train  data sizes:')
    print(train_sizes)
    
    print('\ntest  data sizes:')
    print(test_sizes)        
    rr_model = keras.Sequential()
    rr_model.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 1)))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    rr_model.add(keras.layers.MaxPooling2D((2, 2)))

    rr_model.add(keras.layers.Flatten())
    rr_model.add(keras.layers.Dense(64, activation='relu'))
    rr_model.add(keras.layers.Dense(len(dataset))) # the number of labels will replace the ten 
    
    data_list = os.listdir('train_data')
    data_size = len(data_list)
    print(data_list)
    print('\nsize: ' + str(data_size))
    
    train_data = np.array([np.array(Image.open('train_data'+ '/' + img)).flatten()
                for img in data_list],'f')
    
    train_labels = np.ones((data_size,), dtype = int) 
    temp = 0
    print('\nTrain Labels')
    for val in range(len(train_sizes)):
        train_labels[temp:train_sizes[val]] = val 
        print(train_labels[temp:train_sizes[val]])
        temp = train_sizes[val] + 1
         
    data_list = os.listdir('test_data')
    data_size = len(data_list)
    print(data_list)
    print('\nsize: ' + str(data_size))
    
    test_data = np.array([np.array(Image.open('test_data'+ '/' + img)).flatten()
                for img in data_list],'f')
    
    test_labels = np.ones((len(os.listdir('test_data')),), dtype = int)
    temp = 0
    print('\nTrain Labels')
    for val in range(len(test_sizes)):
        test_labels[temp:test_sizes[val]] = val 
        print(train_labels[temp:train_sizes[val]])
        temp = test_sizes[val] + 1
        

    train_imgs , train_labels = shuffle(train_data, train_labels, random_state = 2)
    test_imgs , test_labels = shuffle(test_data, test_labels, random_state = 2)
    
    train_imgs /= 255
    test_imgs /= 255
    
    train_imgs = train_imgs.reshape(train_imgs.shape[0], 32, 32, 1)
    test_imgs = test_imgs.reshape(test_imgs.shape[0], 32, 32, 1)



    #split the data into training and testing data
    # train_imgs, test_imgs, train_labels, test_labels = train_test_split(shuffled_data, shuffled_labels, test_size = 0.20, random_state = 2)
    rr_model.compile(optimizer='adam',
                loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                metrics=['accuracy'])
    history = rr_model.fit(train_imgs, train_labels, epochs=45, 
                        validation_data=(test_imgs, test_labels))
    print(history)
    rr_model.summary()
    test_loss, test_acc = rr_model.evaluate(test_imgs, test_labels, verbose=2)
    print('Accuraccy: ' + str(test_acc))
    print('Loss: ' + str(test_loss))
    rr_model.save("characterRec.h5")
    
def main():
    createModel()
    
if __name__ == '__main__':
   main()