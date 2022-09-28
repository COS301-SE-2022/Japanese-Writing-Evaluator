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
dataset = ['a', 'e', 'i', 'ka', 'ke', 'ki', 'ko', 'ku', 'o', 'u']

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        kata_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            kata_token = request.headers['user-token']
        if not kata_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(kata_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
  
    return decorated
    
"""
    prepare_katakana function:
        reshapes and load the image into an array with the dimessions the model expect
    parameters: 
        None
    return:
        the test image
"""  
def prepare_katakana():
    cv_katakana_image_1 = cv2.imread('imageToSave.png',cv2.IMREAD_GRAYSCALE)
    cv_katakana_image_2 = cv2.bitwise_not(cv_katakana_image_1)
    cv_katakana_image_3 = cv2.resize(cv_katakana_image_2, (224, 224))
    test_img_1 = np.array([np.array(cv_katakana_image_3).flatten()],'f')
    test_img_2 = test_img_2.reshape(test_img_2.shape[0], 224, 224, 1)
    return test_img_2

"""
    test Katakana function:
        loads the katakana character recongintion model and predict the given image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the defualt for stroke detaction
"""    
def testKatakana(katakana_model):
    pre = katakana_model.predict([prepare_katakana()]).flatten()
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
@app.route("/katakana", methods=["GET"]) 
@token_required
def loadAndPredict():
    kana = tf.keras.models.load_model('../ai/models/hiragana_model.h5') # to be changed to route from the cloud
    resp = testKatakana(kana)
    if(resp != None):
        return jsonify({'response': "evalutor successful", "strokes": resp[0], "score": resp[1] }), 200
    else:
        return jsonify({'response': "evalutor Failed" }), 401

if __name__ == '__main__':
    # app.run(debug = True, port = 5009)
    app.run(port=int(os.environ.get("PORT", 5009)),host='0.0.0.0',debug=True)