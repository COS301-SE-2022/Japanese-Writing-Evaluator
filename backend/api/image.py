import base64
from flask import jsonify
from firebase_admin import credentials, initialize_app, storage
import pyrebase
import os
import json

class Image:
    def __init__(self,db):
        self.db = db
        self.config = {
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
        self.firebase = pyrebase.initialize_app(self.config)
        self.storage = self.firebase.storage()
        self.auth = self.firebase.auth()
        self.user = self.auth.sign_in_with_email_and_password(os.getenv("fire_email"), os.getenv("fire_password"))

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
            
        try:
            self.storage.child("/users/"+str(id)+"/"+file).put("imageToSave.png")
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
    def getCharacters(self):
        try:
            allDirectories = self.storage.list_files()
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
                        "url": self.storage.child(hiraganaG1 + hiraganaFilter_1[1]).get_url(self.user['idToken']),
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
                        "url": self.storage.child(hiraganaG2 + hiraganaFilter_2[1]).get_url(self.user['idToken']),
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
                        "url": self.storage.child(katakanaG1 + katakanaFilter_1[1]).get_url(self.user['idToken']),
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
                        "url": self.storage.child(katakanaG2 + katakanaFilter_2[1]).get_url(self.user['idToken']),
                        "group": files.name.split("/")[1]
                    })
                    katakanaGroups["Group 2"]["characters"].append(image[len(image) - 1])
                    data["Katakana"] = katakanaGroups

                # TODO: add functionality for Kanji

            response = json.dumps(data)
            return jsonify({'response': response}), 200
        
        except Exception as e:
            return jsonify({'response': str(e)}), 401
