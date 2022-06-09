from PIL import Image
import tensorflow as tf
import numpy as np

class Evaluator(object):
    def __init__(self, file, input_char):
        self.file = file
        self.char = input_char
        
    def prepare(file):
        i = Image.open(file )
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img

    def testImage(self):
        if(self.char == 'a'):
            model = tf.keras.models.load_model('../ai/modelA')
            prediction = model.predict([self.prepare(self.file)])
        elif(self.char == 'u'):
            model = tf.keras.models.load_model('../ai/modelU')
            prediction = model.predict([self.prepare(self.file)])
        return prediction