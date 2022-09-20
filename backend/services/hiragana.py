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
dataset = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']

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
    img = i.resize((28,28))
    gray_img = img.convert('L')
    test_img = np.array([np.array(gray_img).flatten()],'f')
    test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
    return test_img

"""
    test hiragana function:
        loads the hiregan character recongintion model and predict the give image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the array from stroke detaction

"""  
def testhiragana(hiragana_model):
    pre = hiragana_model.predict([prepare()]).flatten()

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
        strokes = strokesModel()   
        return (strokes, p)
    except Exception as e:
        print(e)
        return 0
"""
    strokes model function:
        loads the hiregan character recongintion model and predict the give image.
    parameters: 
        None
    return:
        the models confidence as a percentage
"""  
def strokesModel(strokes_model):
    try:
        pre_stroke = strokes_model.predict([prepare()]).flatten()
        return pre_stroke
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
@app.route("/hiragana", methods=["POST"]) 
def loadAndPredict():
    hiragana_model = tf.keras.models.load_model('../ai/models/hiragana_model.h5') # to be changed to route from the cloud
    testhiragana(hiragana_model)
    

if __name__ == '__main__':
    app.run(debug = True, port = 5007)