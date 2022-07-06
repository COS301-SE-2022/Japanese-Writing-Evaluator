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
        img = i.resize((32,32))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 32, 32, 1)
        return test_img

    def testCharacter(self):
        model = tf.keras.models.load_model('backend/ai/characterRec.h5')
        self.char  = float(model.predict([self.prepare()])[0][0])

    def testImage(self):
        self.testCharacter()
        if(self.char == 'A'):
            model = tf.keras.models.load_model('backend/ai/modelA.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            return self.prediction
        elif(self.char == 'U'):
            model = tf.keras.models.load_model('backend/ai/modelU.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            return self.prediction

# if __name__ == '__main__':
#     e = Evaluator('imageTosave.png', 'a')
#     print(e.testImage())