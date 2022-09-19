import base64
from flask import jsonify
import torch
import re
from googletrans import Translator
import pykakasi

class detect:

    """
        detect function:
            loads yolo model and detects what's in the image
        parameter: 
            image
        return:
            the objects detected in the image
    """
    def detect(image):
        try:
            model = torch.hub.load('ultralytics/yolov5', 'yolov5x')

            img = image.partition(",")[2]

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
            
