from PIL import Image
import tensorflow as tf
import numpy as np

class Evaluator(object):
    def __init__(self, style, input_char):
        self.char = input_char
        self.predition = -1
        self.dataset = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']
        self.style = style
        
    def prepare(self):
        i = Image.open('imageToSave.png')
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img
    
    def testCharacter(self):
        self.loadModels()
        if(self.style == 'kanji'):
            return self.testKanji()
        else:
            return self.testHiregana()
            
    def testHiregana(self):
        pre = self.hiregana_model.predict([self.prepare()]).flatten()

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
            if(predicted_char == 'a'): 
                strokes = self.strokesModel()   
                return (strokes, p)
            else:
                return ([0,0,0], p)
        except Exception as e:
            print(e)
            return 0
        
    def strokesModel(self):
        self.loadModels()
        pre_stroke = self.strokes_model.predict([self.prepare()]).flatten()
        array_strokes = []   
        val = 0
        for p in pre_stroke:
            if(len(array_strokes) == 3):
                break
            if(p*100 > 1):
                array_strokes.append(p*100)
                val+=1
        if(len(array_strokes) < 3):
            array_strokes.append(45.3)
        return array_strokes
        
        
    def testKanji(self):
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
        
    def mockTestCharacter(self):
        pre = self.model.predict([self.prepare()]).flatten()
        pre = tf.nn.sigmoid(pre)

        pre = tf.where(pre < 0.5, 0, 1)
        print('\nprediction:\n', self.dataset[pre.numpy()[0]])
        
    def loadModels(self):
        self.hiregana_model = tf.keras.models.load_model('../ai/models/hiregana_model.h5')
        self.kanji_model = tf.keras.models.load_model('../ai/models/kanji_model.h5')
        self.strokes_model = tf.keras.models.load_model('../ai/models/a_strokes.h5')
        

if __name__ == '__main__':
    # e = Evaluator('predict_data/false.png', '*')
    # e = Evaluator('predict_data/a.jpg', '*')
    e = Evaluator('predict_data/ya.jpeg', '*')
    e.strokesModel()
