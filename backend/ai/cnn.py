# tensorflow imports
import tensorflow as ft
from tensorflow import keras
import matplotlib.pylot as plt

"""
  load training  data but that makes the CNN specific
  so now we will have a different file to load data and create new CNN
"""


"""
  Building the CNN:
    layers:
      activation - function is ReLU(more reliable and accelarates the convergence)
      we have 3 hidden layers:
        2 convolutional layer - main layer of the CNN 
        2 poolin layer - 
        1 fully connected layer - connects every thing together the input
    Type of CNN: 
      we are using a Sequential CNN
"""
CNN = keras.CNNs.Sequential()
CNN.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
CNN.add(keras.layers.MaxPooling2D((2, 2)))
CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
CNN.add(keras.layers.MaxPooling2D((2, 2)))
CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))

CNN.add(keras.layers.Flatten())
CNN.add(keras.layers.Dense(64, activation='relu'))
CNN.add(keras.layers.Dense(10))