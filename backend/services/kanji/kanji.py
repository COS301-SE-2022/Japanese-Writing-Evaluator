from functools import wraps
import jwt
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
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})
dataset = []

def token_required(function):
    @wraps(function)
    def kanji_decorated(*args, **kwargs):
        kanji_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            kanji_token = request.headers['user-token']
        if not kanji_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(kanji_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
  

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
    test Kanji function:
        loads the Kanji character recongintion model and predict the given image.
    parameters: 
        None
    return:
        the models confidence as a percentage as well as the defualt for stroke detaction
"""    
def testKanji(kanji_model):
    pre = kanji_model.predict([prepare()]).flatten()
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
 
@app.route("/kanji", methods=["POST"]) 
@token_required
def loadAndPredict():
    Kanji = tf.keras.models.load_model('../ai/models/hiragana_model.h5') # to be changed to route from the cloud
    testKanji(Kanji)
    
if __name__ == '__main__':
    #    app.run(debug = True, port = 5008)
    app.run(port=int(os.environ.get("PORT", 5008)),host='0.0.0.0',debug=True)