import base64
from functools import wraps
import jwt
from PIL import Image
import tensorflow as tf
import numpy as np
import os
import cv2 
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})
dataset = ['dai', 'ichi', 'jin', 'jou', 'juu', 'koku', 'mountain', 'nen', 'ni', 'nichi']

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        kanji_token = None
        if 'user-token' in request.headers:
            kanji_token = request.headers['user-token']
        if not kanji_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(kanji_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except Exception:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
  
    return decorated 

"""
    Prepare function:
        reshapes and load the image into an array with the dimessions the model expect
    parameters: 
        None
    return:
        the test image
"""  
def kanji_prepare(imgBase64):
    image = imgBase64.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))
        
    img_path = 'imageToSave.png'
    img = tf.keras.utils.load_img(img_path, target_size=(224, 224))
    img_array = tf.keras.utils.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return tf.keras.applications.mobilenet.preprocess_input(img_array_expanded_dims)

"""
    test Kanji function:
        loads the Kanji character recongintion model and predict the given image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the defualt for stroke detaction
"""    
def testKanji(kanji_model, img):
    pre = kanji_model.predict([kanji_prepare(img)]).flatten()
    print(pre)

    temp = 0
    val = 0
    final = 0
    for n in pre:
        if(n >temp):
            temp = n
            final = val
        val+=1
    print('final:', final)
    try:
        predicted_char = dataset[final]
        print('\nprediction:\n', predicted_char)
        print('accuracy: ' + str(temp * 100) + '%')
        p = temp * 100
        return ([0,0,0], p)
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
 
@app.route("/kanji", methods=["POST"]) 
def loadAndPredict():
    img = request.json["image"]
    Kanji = tf.keras.models.load_model('kanji.h5', compile = False) # to be changed to route from the cloud
    resp = testKanji(Kanji, img)
    print('resp:', resp)
    if(resp != None):
        return jsonify({'response': "evalutor successful", "strokes": resp[0], "score": resp[1]}), 200
    else:
        return jsonify({'response': "evalutor Failed" }), 401
    
if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 5008)),host='0.0.0.0',debug=False)
    # kanji_prepare()
