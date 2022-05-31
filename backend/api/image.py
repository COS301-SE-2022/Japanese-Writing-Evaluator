import base64
from flask import jsonify
from firebase_admin import credentials, initialize_app, storage
import pyrebase
import os
import json

dirname = os.path.dirname(__file__)
dir = dirname.split("\\")
dir.remove(dir[len(dir) - 1])
dir.remove(dir[len(dir) - 1])
direct = ""

for folder in dir:
    direct += folder + "/"

config = {
    "apiKey": os.getenv("fire_apiKey"),
    "authDomain": os.getenv("fire_authDomain"),
    "projectId": os.getenv("fire_projectId"),
    "storageBucket": os.getenv("fire_storageBucket"),
    "messagingSenderId": os.getenv("fire_messagingSenderId"),
    "appId": os.getenv("fire_appId"),
    "measurementId": os.getenv("fire_measurementId"),
    "serviceAccount": os.path.abspath(direct + "bug-slayers-jwe-firebase-adminsdk-o4ico-e446da549b.json"),
    "databaseURL": ""
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(os.getenv("fire_email", os.getenv("fire_password")))

class Image:
    def __init__(self,db):
        self.db = db
        self.config = {
            'apiKey': os.getenv('FB_AIPKEY'),
            'authDomain': os.getenv('FB_authDomain'),
            'projectId': os.getenv('FB_projectId'),
            'storageBucket': os.getenv('FB_storageBucket'),
            'messagingSenderId': os.getenv('FB_messagingSenderId'),
            'appId': os.getenv('FB_appId'),
            'serviceAccount' : "service.json",
            'databaseURL': os.getenv('FB_DBURL')
        }

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
    def uploadImage(self, id, image_char, image, file):
        score = self.sendImage(id, image_char, image, file)
        if score == None:
            return jsonify({'response': "image upload failed."}), 401
        else:
            return jsonify({'response': "image upload successful.", "score":score}), 200

    """
        viewImages function:
            get all the users image 
        parameters: 
            id: the user id
        return:
            json response
    """
    def viewImages(self, id):
        images = self.db.getImage(id)
        if images:
            return jsonify({'response': images}), 200
        else:
            return jsonify({'response': "view image failed."}), 401

    """
        send Image function:
            send the image the user upload to firebase 
        parameters: 
            image: the user uploaded image from front-end
            id: the unique id of the user
            image_char: the character of the uploaded image
        return:
            json response
    """
    def sendImage(self, id, image_char, image, file):
        image = image.partition(",")[2]
        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.b64decode(image))
            
        firebase = pyrebase.initialize_app(self.config)
        storage = firebase.storage()
        try:
            storage.child("/users/"+str(id)+"/"+file).put("imageToSave.png")
            score = 0 # call the AI
            image_path = "/users/"+str(id)+"/"+file
            self.db.saveImage(id, image_path, image_char, score)
            return score
        except:
            return None

    """
        getCharacters function:
            gets all the Hiragana charatcers from the firebase storage
        request body:

        return:
            returns a json object containing grouped image urls
    """
    def getCharacters():
        try:
            hiraganaG1 = "characters/Hiragana/Group_1/"
            hiraganaG2 = "characters/Hiragana/Group_2/"
            allDirectories = storage.list_files()
            hiraganaList_1 = list()
            hiraganaList_2 = list()
            hiraganaGroup_1 = list()
            hiraganaGroup_2 = list()
            data = list()
            hiraganaNames_1 = list()
            hiraganaNames_2 = list()

            image = []
            data = {"Hiragana": {}, "Katakana": {}, "Kanji": {}}
            groups = {"Group 1": {"characters": []},"Group 2": {"characters": []}, "Group 3": {"characters": []}, "Group 4": {"characters": []}, "Group 5": {"characters": []}, "Group 6": {"characters": []}, "Group 7": {"characters": []}, "Group 8": {"characters": []}, "Group 9": {"characters": []}, "Group 10": {"characters": []}}

            for files in allDirectories:
                #////////////////////////////////
                #HIRAGANA
                #///////////////////////////////
                filter_1 = files.name.split(hiraganaG1)
                if(filter_1[0] == "" and filter_1[1] != ""):
                    hiraganaList_1.append(filter_1[1]) #file
                    hiraganaNames_1.append(filter_1[1].split(".")[0]) #name
                    image.append({
                        "Name": filter_1[1].split(".")[0],
                        "url": storage.child(hiraganaG1 + filter_1[1]).get_url(user['idToken']),
                        "group": files.name.split("/")[1]
                    })
                    groups["Group 1"]["characters"].append(image[len(image) - 1])
                    data["Hiragana"] = groups
                
                filter_2 = files.name.split(hiraganaG2)
                if(filter_2[0] == "" and filter_2[1] != ""):
                    hiraganaList_2.append(filter_2[1])
                    hiraganaNames_2.append(filter_2[1].split(".")[0])
                    image.append({
                        "Name": filter_2[1].split(".")[0],
                        "url": storage.child(hiraganaG2 + filter_2[1]).get_url(user['idToken']),
                        "group": files.name.split("/")[1]
                    })
                    groups["Group 2"]["characters"].append(image[len(image) - 1])
                    data["Hiragana"] = groups

                # TODO: add functionality for Katakana

                # TODO: add functionality for Kanji

            response = json.dumps(data)
            return jsonify({'response': response}), 200
        
        except Exception as e:
            return jsonify({'response': str(e)}), 401
