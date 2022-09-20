from PIL import Image
import tensorflow as tf
import numpy as np
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)
dataset = ['a', 'e', 'i', 'ka', 'ke', 'ki', 'ko', 'ku', 'o', 'u']

"""
    Prepare function:
        reshapes and load the image into an array with the dimessions the model expect
    parameters: 
        None
    return:
        the test image
"""  
def prepare():
    i = Image.open('imageToSave.png')
    img = i.resize((224,224))
    gray_img = img.convert('L')
    test_img = np.array([np.array(gray_img).flatten()],'f')
    test_img = test_img.reshape(test_img.shape[0], 224, 224, 1)
    return test_img

"""
    test Katakana function:
        loads the katakana character recongintion model and predict the given image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the defualt for stroke detaction
"""    
def testKatakana(katakana_model):
    pre = katakana_model.predict([prepare()]).flatten()
    temp = 0
    val = 0
    final = 0
    for n in pre:
        if(n >temp):
            temp = n
            final = val
        val+=1
    try:
        predicted_char = dataset[final]
        print('\nprediction:\n', predicted_char)
        print('accuracy: ' + str(temp * 100) + '%')
        p = temp * 100
        return ([0,0,0], p)
    except Exception as e:
        print(e)
        return 0
    
"""
    loadAndPredict function:
        loads the hiregan character recongintion model and then call the test hiragana test function.
    parameters: 
        None
    return:
        None
"""   
@app.route("/katakana", methods=["POST"]) 
def loadAndPredict():
    kana = tf.keras.models.load_model('../ai/models/hiragana_model.h5') # to be changed to route from the cloud
    testKatakana(kana)

if __name__ == '__main__':
    app.run(debug = True, port = 5009)