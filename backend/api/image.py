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
            g1 = "characters/Hiragana/Group_1/"
            g2 = "characters/Hiragana/Group_2/"
            allDirectories = storage.list_files()
            list_1 = list()
            list_2 = list()
            group_1 = list()
            group_2 = list()

            for files in allDirectories:
                filter_1 = files.name.split(g1)
                if(filter_1[0] == "" and filter_1[1] != ""):
                    # print("Group 1: " + files.name)
                    list_1.append(filter_1[1])
                
                filter_2 = files.name.split(g2)
                if(filter_2[0] == "" and filter_2[1] != ""):
                    # print("Group 2: " + files.name)
                    list_2.append(filter_2[1])

            for files in list_1:
                group_1.append(storage.child(g1 + files).get_url(user['idToken']))

            for files in list_2:
                group_2.append(storage.child(g2 + files).get_url(user['idToken']))

            data = {"Group 1": group_1, "Group 2": group_2}
            response = json.dumps(data)
            return jsonify({'response': response}), 200
        
        except Exception as e:
            return jsonify({'response': str(e)}), 401
