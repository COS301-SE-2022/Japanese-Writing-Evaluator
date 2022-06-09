from PIL import Image
import tensorflow as tf
import numpy as np

class Evaluator(object):
    def __init__(self, file, input_char):
        self.file = file
        self.char = input_char
        self.predition = -1
        
    def prepare(self):
        i = Image.open(self.file)
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img

    def testImage(self):
        print('\n In Model U and char: ' + self.char)
        
        if(self.char == 'a'):
            model = tf.keras.models.load_model('../ai/modelA')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            return self.prediction
        elif(self.char == 'U'):
            print('\n In Model U')
            model = tf.keras.models.load_model('../ai/modelU')
            print('\n After load')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            print('\n In Model U and score: ' + str(self.prediction))
            return self.prediction

# if __name__ == '__main__':
#     e = Evaluator('imageTosave.png', 'a')
#     print(e.testImage())