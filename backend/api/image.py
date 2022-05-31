import base64
from flask import jsonify
from firebase_admin import credentials, initialize_app, storage
import pyrebase
import os

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
   