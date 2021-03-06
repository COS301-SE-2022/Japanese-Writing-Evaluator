from PIL import Image
import tensorflow as tf
import numpy as np
from flask import jsonify
import base64

class Evaluator(object):
    def __init__(self, file, input_char):
        self.file = file
        self.char = input_char
        self.predition = -1
        self.dataset = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']
        
        
    def prepare(self):
        i = Image.open('imageToSave.png')
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img

    def testCharacter(self):
        model = tf.keras.models.load_model('../ai/models/beta_model.h5')
        pre = model.predict([self.prepare()]).flatten()

        temp = 0
        val = 0
        final = 0
        for n in pre:
            if(n >temp):
                temp = n
                final = val
            val+=1
        try:
            print('\nprediction:\n', self.dataset[final])
            print('accuracy: ' + str(temp * 100) + '%')
            p = temp * 100
            return p
        except Exception as e:
            print(e)
            return None
        
    def mockTestCharacter(self):
        model = tf.keras.models.load_model('../ai/models/characterRec.h5')
        pre = model.predict([self.prepare()]).flatten()
        pre = tf.nn.sigmoid(pre)

        pre = tf.where(pre < 0.5, 0, 1)
        print('\nprediction:\n', self.dataset[pre.numpy()[0]])

    def testImage(self):
        self.testCharacter()
        if(self.char == 'A'):
            model = tf.keras.models.load_model('backend/ai/modelA.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            return self.prediction
        elif(self.char == 'U'):
            model = tf.keras.models.load_model('backend/ai/modelU.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            print('\n In Model U and score: ' + str(self.prediction))
            return self.prediction


if __name__ == '__main__':
    # e = Evaluator('predict_data/false.png', '*')
    # e = Evaluator('predict_data/a.jpg', '*')
    e = Evaluator('predict_data/ya.jpeg', '*')
    e.testCharacter()
