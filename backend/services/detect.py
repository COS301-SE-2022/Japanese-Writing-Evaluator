import base64
import os
from dotenv import load_dotenv
from flask import jsonify
import torch
import re
from googletrans import Translator
import pykakasi
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;
import json
from werkzeug.middleware.dispatcher import DispatcherMiddleware

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)


"""
    detect function:
        loads yolo model and detects what's in the image
    parameter: 
        image
    return:
        the objects detected in the image
"""
@app.route('/detect', methods=['POST'])
def detect():
    try:
        model = torch.hub.load('ultralytics/yolov5', 'yolov5x')
        img = str(request.json["image"]).partition(",")[2]

        with open("objectImage.jpeg", "wb") as fh:
            fh.write(base64.b64decode(img))

        im = "objectImage.jpeg"

        results = model(im)
        res = str(results.pandas().xyxy[0])
        splitted = res.split('name')
        
        # print(results.print())

        classes = re.findall(r'[a-zA-Z]+', splitted[1])
        # print(classes)
        # print(len(classes))

        store = []
        for i in classes:
            if i in store: 
                continue
            else:
                store.append(i)

        translator = Translator()
        convert = pykakasi.kakasi()
        # store = translator.translate(text1, "ja", "en")

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
                    "Object": i,
                    "Characters": chars,
                    "Pronunciation": j['hepburn']
                })

        return jsonify({'response': words}), 200
    except Exception as e:
        return jsonify({'response': e}), 400
            
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=5001)
