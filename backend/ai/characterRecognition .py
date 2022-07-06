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
  
data_list = os.listdir('data_path')
data = np.array([np.array(Image.open('data_path'+ '/' + img)).flatten()
              for img in data_list],'f')
data_labels = np.ones((len(data_list),), dtype = int)

data_labels[:len(data_list)]    # if 0 - n is a then  data_labels[:n+1] = 0

shuffled_data , shuffled_labels = shuffle(data, data_labels, random_state = 2)

#split the data into training and testing data
train_imgs, test_imgs, train_labels, test_labels = train_test_split(shuffled_data, shuffled_labels, test_size = 0.20, random_state = 2)
rr_model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])
history = rr_model.fit(train_imgs, train_labels, epochs=45, 
                    validation_data=(test_imgs, test_labels))
print(history)
rr_model.summary()

rr_model.save("characterRec.h5")


# prediction
# pre = rr_model.predict(prepare('test_img'))
# character = int(pre[0][0])