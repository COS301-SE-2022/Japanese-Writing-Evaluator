from flask import jsonify
import base64
from flask import jsonify
import pyrebase
import os
import json

from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)

config = {
    'apiKey': os.getenv('FB_APIKEY'),
    'authDomain': os.getenv('FB_authDomain'),
    'projectId': os.getenv('FB_projectId'),
    'storageBucket': os.getenv('FB_storageBucket'),
    'messagingSenderId': os.getenv('FB_messagingSenderId'),
    'appId': os.getenv('FB_appId'),
    "measurementId": os.getenv("FB_measurementId"),
    'serviceAccount' : "service.json",
    'databaseURL': os.getenv('FB_DBURL')
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(os.getenv("fire_email"), os.getenv("fire_password"))

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
def uploadImage(self, id, imageChar, image, file):
    try:
        res = storage.child("/users/"+str(id)+"/"+file).put("imageToSave.png")
        store = jsonify(res)
        print(store.status_code)
        return json(store)
    except:
        return None

"""
    viewImages function:
        calls get images to send the url to front-end 
    request body: 
        id: the user id
    return:
        json response
"""
@app.route("/viewImages", methods=["POST"])
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

        return jsonify({'response': response}), 200
    else:
        return jsonify({'response': "view image failed."}), 401

"""
    getCharacters function:
        gets all the Hiragana charatcers from the firebase storage
    request body:

    return:
        returns a json object containing grouped image urls
"""
def getCharacters(self):
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
            #////////////////////////////////
            #HIRAGANA
            #///////////////////////////////
            hiraganaFilter_1 = files.name.split(hiraganaG1)
            if(hiraganaFilter_1[0] == "" and hiraganaFilter_1[1] != ""):
                hiraganaList_1.append(hiraganaFilter_1[1]) #file
                hiraganaNames_1.append(hiraganaFilter_1[1].split(".")[0]) #name
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

            #////////////////////////////////
            #Katakana
            #///////////////////////////////
            katakanaFilter_1 = files.name.split(katakanaG1)
            if(katakanaFilter_1[0] == "" and katakanaFilter_1[1] != ""):
                katakanaList_1.append(katakanaFilter_1[1]) #file
                katakanaNames_1.append(katakanaFilter_1[1].split(".")[0]) #name
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

            # TODO: add functionality for Kanji

        response = json.dumps(data)
        return jsonify({'response': response}), 200
    
    except Exception as e:
        return jsonify({'response': str(e)}), 401

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
    app.run(debug = True, port = 5004)