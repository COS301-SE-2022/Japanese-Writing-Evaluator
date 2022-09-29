import base64
from functools import wraps
import jwt
from PIL import Image
import tensorflow as tf
import numpy as np
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;
import cv2

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})
dataset = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n', 'error']
singleStroke = ['he', 'hi', 'ku', 'shi', 'te', 'tsu']
two_strokes = ['i', 'u']

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        hira_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            hira_token = request.headers['user-token']
        if not hira_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(hira_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
    
    return decorated
    
"""
    prepare_hiragana function:
        reshapes and load the image into an array with the dimessions the model expect
    parameters: 
        None
    return:
        the test image
"""  
def prepare_hiragana(imgBase64):
    image = imgBase64.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))
        
    cv_hiragana_image = cv2.imread('imageToSave.png',cv2.IMREAD_GRAYSCALE)
    cv_hiragana_image = cv2.bitwise_not(cv_hiragana_image)
    cv_hiragana_image = cv2.resize(cv_hiragana_image, (28, 28))
    test_img = np.array([np.array(cv_hiragana_image).flatten()],'f')
    test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
    return test_img

def prepare_stroke(img):
    img_path = 'imageToSave.png'
    img = tf.keras.utils.load_img(img_path, target_size=(224, 224))
    img_array = tf.keras.utils.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return tf.keras.applications.mobilenet.preprocess_input(img_array_expanded_dims)

"""
    test hiragana function:
        loads the hiregan character recongintion model and predict the give image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the array from strokes detaction

"""  
def testhiragana(hiragana_model, img):
    pre = hiragana_model.predict([prepare_hiragana(img)]).flatten()

    temp = 0
    val = 0
    final = 0
    for n in pre:
        if(n >temp and n > 0.4):
            temp = n
            final = val
        val+=1
    try:
        print(final)
        predicted_char = dataset[final]
        if predicted_char == 'error':
            return (0, 0)
        print('\nprediction:\n', predicted_char)
        print('accuracy: ' + str(temp * 100) + '%')
        p = temp * 100
        if predicted_char == 'i':
            model = tf.keras.models.load_model('models/i_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'u':
            model = tf.keras.models.load_model('models/u_strokes.h5',  compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'te':
            model = tf.keras.models.load_model('models/te_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)      
        elif predicted_char == 'tsu':
            model = tf.keras.models.load_model('models/tsu_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'he':
            model = tf.keras.models.load_model('models/he_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'hi':
            model = tf.keras.models.load_model('models/hi_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'ku':
            model = tf.keras.models.load_model('models/ku_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'shi':
            model = tf.keras.models.load_model('models/shi_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        elif predicted_char == 'ko':
            model = tf.keras.models.load_model('models/ko_strokes.h5', compile=False)
            strokes =  strokesModel(model, img, predicted_char)
        else:
            strokes = [0]
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
def strokesModel(strokes_model, img, pre_char):
    try:
        pre_stroke = strokes_model.predict([prepare_stroke(img)])
        if pre_char in singleStroke:
            return str(pre_stroke[0])
        elif pre_char in two_strokes:
            return pre_stroke[0].tolist()
        else:
            return [0] # not implimented yet
    except Exception as e:
        print(e)
        return [0]
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
    img = request.json["image"]
    hiragana_model = tf.keras.models.load_model('models/hiragana_model.h5') # to be changed to route from the cloud
    resp = testhiragana(hiragana_model, img)
    print("\nresp: ",resp)
    if(resp != None):
        return jsonify({'response': "evalutor successful", "strokes": resp[0], "score": resp[1]}), 200
    elif resp == (0, 0):
        return jsonify({'response': "invalid input" }), 404
    else:
        return jsonify({'response': "evalutor Failed" }), 401

if __name__ == '__main__':
    # app.run(debug = True, port = 5007)
    app.run(port=int(os.environ.get("PORT", 5007)),host='0.0.0.0',debug=False)