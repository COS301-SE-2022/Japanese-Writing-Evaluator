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
        
    def prepare(self):
        i = Image.open(self.file)
        img = i.resize((28,28))
        gray_img = img.convert('L')
        test_img = np.array([np.array(gray_img).flatten()],'f')
        test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
        return test_img

    def testImage(self):
        if(self.char == 'A'):
            model = tf.keras.models.load_model('backend/ai/modelA.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            return self.prediction
        elif(self.char == 'U'):
            model = tf.keras.models.load_model('backend/ai/modelU.h5')
            self.prediction = float(model.predict([self.prepare()])[0][0])
            print('\n In Model U and score: ' + str(self.prediction))
            return self.prediction


# if __name__ == '__main__':
#     e = Evaluator('imageTosave.png', 'a')
#     print(e.testImage())

"""
guest Upload Image function:
    uploads teh given image to firebase and sends it to the evaluator
parameters: 
    image_char: the charector of the image
    image: the guest user image
return:
    json response
"""
def guestUploadImage(image_char, image):
    image = image.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))
        
    e = Evaluator('imageTosave.png', image_char)
    score = e.testImage() # call the AI
    print(score)
    if score == None:
        return jsonify({'response': "image evaluation Failed."}), 401
    else:
        return jsonify({'response': "image evaluation successful", 'score': score}), 200

def sendToEvaluator(image, image_char):
    image = image.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))

    compare = Evaluator("../api/imageToSave.png", image_char)
    score = compare.testImage() # call the AI
    return score