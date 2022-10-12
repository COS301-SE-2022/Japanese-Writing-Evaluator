import base64
from functools import wraps
import jwt
import os
from dotenv import load_dotenv
from flask import jsonify
import torch
import re
from googletrans import Translator
import pykakasi
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        detect_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            detect_token = request.headers['user-token']
        if not detect_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(detect_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except Exception as e:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)

    return decorated

"""
    detect function:
        loads yolo model and detects what's in the image
    parameter: 
        image
    return:
        the objects detected in the image
"""
@app.route('/detect', methods=['POST'])
@token_required
def detect():
    try:
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

        image = request.json["image"]
        img = image.partition(",")[2]

        with open("objectImage.jpeg", "wb") as fh:
            fh.write(base64.b64decode(img))

        im = "objectImage.jpeg"

        results = model(im)
        res = str(results.pandas().xyxy[0])
        splitted = res.split('name')

        classes = re.findall(r'[a-zA-Z]+', splitted[1])

        store = []
        for i in classes:
            if i in store: 
                continue
            else:
                store.append(i)

        translator = Translator()
        convert = pykakasi.kakasi()

        words = []
        for i in store:

            trans = translator.translate(i, "ja", "en")
            translation = str(trans).split(",")
            text = translation[2].split("text=")
            characters = list(text[1])

            word = text[1]
            res = convert.convert(word)

            for j in res:
    
                chars = list(j['hira'])

                words.append({
                    "object": i,
                    "characters": chars,
                    "pronunciation": j['hepburn']
                })

        return jsonify({'response': words}), 200
    except Exception as e:
        return jsonify({'response': "Object detection failed"}), 400
        
if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 5001)),host='0.0.0.0',debug=False)