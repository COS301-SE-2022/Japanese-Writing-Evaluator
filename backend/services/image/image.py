from functools import wraps
import jwt
import base64
import pyrebase
from dotenv import load_dotenv
import os
import json
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app", "http://127.0.0.1:5003", "https://jwe-imagedb-cplmvcuylq-uc.a.run.app"]}})

config = {
    "apiKey": os.getenv("FB_APIKEY"),
    "authDomain": os.getenv("FB_authDomain"),
    "databaseURL": os.getenv("FB_DBURL"),
    "projectId": os.getenv("FB_projectId"),
    "storageBucket": os.getenv("FB_storageBucket"),
    "messagingSenderId": os.getenv("FB_messagingSenderId"),
    "appId": os.getenv("FB_appId"),
    "measurementId": os.getenv("FB_measurementId"),
    'serviceAccount' : "service.json"
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(os.getenv("fire_email"), os.getenv("fire_password"))

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        img_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            img_token = request.headers['user-token']
        if not img_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(img_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)

    return decorated
    
"""
    upload Image function:
        uploads teh given image to firebase and sends it to the evaluator
    parameters: 
        id: the id of the user uploading
        image_path: the path of the image on firebase
        image_char: the charector of the image
        score: the score the user recieved from the evalutor
    return:
        json response
"""
@app.route("/uploadImage", methods=["POST"])
@token_required
def uploadImage():
    try:
        image = request.json["image"].partition(",")[2]
        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.b64decode(image))
        id = request.json["id"]
        file = request.json["file"]

        res = storage.child("/users/"+str(id)+"/"+file).put("imageToSave.png")
        store = jsonify(res)
        if(store.status_code == 200):
            return jsonify({'response': "cloud storgae successful"}), 200
        else:
            return jsonify({'reponse': "upload unsuccessful"}), 400    
    except:
        return jsonify({'reponse': "upload unsuccessful"}), 400

"""
    viewImages function:
        calls get images to send the url to front-end 
    request body: 
        id: the user id
    return:
        json response
"""
@app.route("/viewImages", methods=["POST"])
@token_required
def viewImages():
    images = request.json["images"]
    if len(images) > 0:
        response = []
        for imgs in images:
            style = imgs[4]
            response.append({
                "writing_style": style.lower(),
                "url": storage.child(imgs[1]).get_url(user['idToken']),
                "character": imgs[2],
                "score": imgs[3],
                "uploadDate": imgs[5]
            })

        return jsonify({'response': response,}), 200
    else:
        return jsonify({'response': "view image failed."}), 401

"""
    getCharacters function:
        gets all the Hiragana charatcers from the firebase storage
    request body:

    return:
        returns a json object containing grouped image urls
"""
def getCharacters():
    try:
        allDirectories = storage.list_files()
        hiraganaG1 = "characters/Hiragana/Group_1/"
        hiraganaG2 = "characters/Hiragana/Group_2/"
        katakanaG1 = "characters/Katakana/Group_1/"
        katakanaG2 = "characters/Katakana/Group_2/"

        hiraganaList_1 = list()
        hiraganaList_2 = list()
        katakanaList_1 = list()
        katakanaList_2 = list()

        hiraganaNames_1 = list()
        hiraganaNames_2 = list()
        katakanaNames_1 = list()
        katakanaNames_2 = list()

        image = []
        data = {"Hiragana": {}, "Katakana": {}, "Kanji": {}}
        hiraganaGroups = {"Group 1": {"characters": []},"Group 2": {"characters": []}, "Group 3": {"characters": []}, "Group 4": {"characters": []}, "Group 5": {"characters": []}, "Group 6": {"characters": []}, "Group 7": {"characters": []}, "Group 8": {"characters": []}, "Group 9": {"characters": []}, "Group 10": {"characters": []}}
        katakanaGroups = {"Group 1": {"characters": []},"Group 2": {"characters": []}, "Group 3": {"characters": []}, "Group 4": {"characters": []}, "Group 5": {"characters": []}, "Group 6": {"characters": []}, "Group 7": {"characters": []}, "Group 8": {"characters": []}, "Group 9": {"characters": []}, "Group 10": {"characters": []}}

        for files in allDirectories:
            hiraganaFilter_1 = files.name.split(hiraganaG1)
            if(hiraganaFilter_1[0] == "" and hiraganaFilter_1[1] != ""):
                hiraganaList_1.append(hiraganaFilter_1[1])
                hiraganaNames_1.append(hiraganaFilter_1[1].split(".")[0])
                image.append({
                    "Name": hiraganaFilter_1[1].split(".")[0],
                    "url": storage.child(hiraganaG1 + hiraganaFilter_1[1]).get_url(user['idToken']),
                    "group": files.name.split("/")[1]
                })
                hiraganaGroups["Group 1"]["characters"].append(image[len(image) - 1])
                data["Hiragana"] = hiraganaGroups
            
            hiraganaFilter_2 = files.name.split(hiraganaG2)
            if(hiraganaFilter_2[0] == "" and hiraganaFilter_2[1] != ""):
                hiraganaList_2.append(hiraganaFilter_2[1])
                hiraganaNames_2.append(hiraganaFilter_2[1].split(".")[0])
                image.append({
                    "Name": hiraganaFilter_2[1].split(".")[0],
                    "url": storage.child(hiraganaG2 + hiraganaFilter_2[1]).get_url(user['idToken']),
                    "group": files.name.split("/")[1]
                })
                hiraganaGroups["Group 2"]["characters"].append(image[len(image) - 1])
                data["Hiragana"] = hiraganaGroups

            katakanaFilter_1 = files.name.split(katakanaG1)
            if(katakanaFilter_1[0] == "" and katakanaFilter_1[1] != ""):
                katakanaList_1.append(katakanaFilter_1[1])
                katakanaNames_1.append(katakanaFilter_1[1].split(".")[0])
                image.append({
                    "Name": katakanaFilter_1[1].split(".")[0],
                    "url": storage.child(katakanaG1 + katakanaFilter_1[1]).get_url(user['idToken']),
                    "group": files.name.split("/")[1]
                })
                katakanaGroups["Group 1"]["characters"].append(image[len(image) - 1])
                data["Katakana"] = katakanaGroups
            
            katakanaFilter_2 = files.name.split(katakanaG2)
            if(katakanaFilter_2[0] == "" and katakanaFilter_2[1] != ""):
                katakanaList_2.append(katakanaFilter_2[1])
                katakanaNames_2.append(katakanaFilter_2[1].split(".")[0])
                image.append({
                    "Name": katakanaFilter_2[1].split(".")[0],
                    "url": storage.child(katakanaG2 + katakanaFilter_2[1]).get_url(user['idToken']),
                    "group": files.name.split("/")[1]
                })
                katakanaGroups["Group 2"]["characters"].append(image[len(image) - 1])
                data["Katakana"] = katakanaGroups

        response = json.dumps(data)
        return jsonify({'response': response}), 200
    
    except Exception as e:
        return jsonify({'response': str(e)}), 401

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 5004)),host='0.0.0.0',debug=False)