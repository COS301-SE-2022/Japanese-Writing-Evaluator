from PIL import Image
import tensorflow as tf
import numpy as np

class Katakana(object):
    def __init__(self, input_char):
        self.predition = -1
        self.dataset = ['a', 'e', 'i', 'ka', 'ke', 'ki', 'ko', 'ku', 'o', 'u']
    
    """
        Prepare function:
            reshapes and load the image into an array with the dimessions the model expect
        parameters: 
            None
        return:
            the test image
    """  
    def prepare(self):
        i = Image.open('imageToSave.png')
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img
    
    """
        test Katakana function:
            loads the katakana character recongintion model and predict the given image.
        parameters: 
            None
        return:
            the models confidence as a percentage as well as the defualt for stroke detaction
    """    
    def testKatakana(self):
        pre = self.kanji_model.predict([self.prepare()]).flatten()
        temp = 0
        val = 0
        final = 0
        for n in pre:
            if(n >temp):
                temp = n
                final = val
            val+=1
        try:
            predicted_char = self.dataset[final]
            print('\nprediction:\n', predicted_char)
            print('accuracy: ' + str(temp * 100) + '%')
            p = temp * 100
            return ([0,0,0], p)
        except Exception as e:
            print(e)
            return 0

if __name__ == '__main__':
    # e = Evaluator('predict_data/false.png', '*')
    # e = Evaluator('predict_data/a.jpg', '*')
    e = Katakana('predict_data/ya.jpeg', '*')
    e.strokesModel()