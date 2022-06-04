# tensorflow imports
import tensorflow as tf
from tensorflow import keras
import matplotlib.pylot as plt

"""
  load training  data but that makes the self.CNN specific
  so now we will have a different file to load data and create new self.CNN
"""


"""
  Building the self.CNN:
    layers:
      activation - function is ReLU(more reliable and accelarates the convergence)
      we have 3 hidden layers:
        2 convolutional layer - main layer of the self.CNN 
        2 poolin layer - 
        1 fully connected layer - connects every thing together the input and output
    Type of self.CNN: 
      we are using a Sequential self.CNN
"""
class CNN():
  def __init__(self, dataset):
    self.CNN = keras.self.CNNs.Sequential()
    (self.train_image, self.train_labels), (self.test_images, test_labels) = keras.datasets.cifar10.load_data()
    #Normalie pixel values to between 0 and 1
    self.train_image, self.test_images = self.train_image/255.0, self.test_images/255.0  
  
  def create_CNN(self):
    self.CNN.add(keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))
    self.CNN.add(keras.layers.MaxPooling2D((2, 2)))
    self.CNN.add(keras.layers.Conv2D(64, (3, 3), activation='relu'))

    self.CNN.add(keras.layers.Flatten())
    self.CNN.add(keras.layers.Dense(64, activation='relu'))
    self.CNN.add(keras.layers.Dense(10))
  
  def trian_model(self, name):
    self.CNN.compile(optimizer=name,
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

    history = self.CNN.fit(self.train_images, self.train_labels, epochs=10, 
                    validation_data=(self.test_images, self.test_labels))
    test_loss, test_acc = self.CNN.evaluate(self.test_images,  self.test_labels, verbose=2)