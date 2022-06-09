import sys
sys.path.append('../database')

from database import Database
from evalutor import Evaluator
from flask import jsonify
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
        print(image)
        if(image == None):
            return jsonify({'response': "image upload successful. No image."}), 409
        score = self.sendImage(id, image_char, image, file)
        if score == None:
            return jsonify({'response': "image upload failed."}), 401
        else:
            return jsonify({'response': "image upload successful.", "score":score}), 200

    """
        viewImages function:
            calls get images to send the url to front-end 
        request body: 
            id: the user id
        return:
            json response
    """

    def viewImages(self, id):
        images = self.db.getImage(id)
        if images:
            response = []
            i = 0
            for imgs in images:
                response.append({
                    i: {
                        "url": self.storage.child(imgs[1]).get_url(self.user['idToken']),
                        "character": imgs[2],
                        "score": imgs[3]
                    }
                })
                i = i + 1
            return jsonify({'response': response}), 200
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
        print(image)
        print("send image")
        try:
            self.storage.child("/users/"+str(id)+"/"+file).put("imageToSave.png")
            compare = Evaluator("../api/imageToSave.png", image_char)
            score = compare.testImage() # call the AI
            image_path = "/users/"+str(id)+"/"+file
            # self.db.saveImage(id, image_path, image_char, score)
            print("\nScore: " + str(score))
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
        """
    guest Upload Image function:
        uploads teh given image to firebase and sends it to the evaluator
    parameters: 
        image_char: the charector of the image
        image: the guest user image
    return:
        json response
    """
    def guestUploadImage(self, image_char, image):
        image = image.partition(",")[2]
        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.b64decode(image))
            
        e = Evaluator('imageTosave.png', image_char)
        score = e.testImage() # call the AI
        print(score)
        if score == None:
            return jsonify({'response': "image evaluation Failed."}), 401
        else:
            return jsonify({'response': "image evaluation successful.", "score":score}), 200
        
# if __name__ == '__main__':
#     db = Database()
#     img = Image(db)
#     img.sendImage(82, 'a', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/wAALCAAcABwBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APw//ZV8KfAjx1+0d4L8GftO+O9R8L/D/VPEFva+LPEWkxI9xp1m7bWmUOrL8uQSSrYXJwcYP7O/8Eav+CFfhv8AZp/bPu/jp8cv2oP2Y/jN8HbL4fa8/ia00TxjHq7pprQALeS2skOxYwNpaQsQgzznaa/In/god4U/ZW8Eftr/ABG8M/sR+NG8QfCq38RSHwZqbGQhrV0VzEjSAO6RyM8Su3LrGrEnOT4xX0v+wB/wTW8b/toHWfir498f6d8L/gv4MTzfH3xd8UR4sNOGCVtbZCym9vJMYS3jJYllzjK7vvD/AIIz/ED/AIJvfszftBftDy/st6b45+Lqad+y34q1JfEXjfSRplvPHaqr3WnCxgkbzbedFhb7RNJC67WjEeWDV8d/A7wL+xD/AMFBtOuvgX4W+Fdr8FPjlqNwF+Gsmj+Irqbwn4kmER26VdDVLmeeyvJ5AEhuBP5BeRUdE4ZvlPx/4A8b/Crxtqvw2+JXhO/0LX9DvpLPWNH1S1aG4s7iNirxyIwBVgR0NfsX+xJ8FNY/4LQf8EC/C3/BN79lnT9B0/4n/CH412+o+Kv7Sv1s4RpN5/aLLq0vylrgATtCVTL5gHGCoP2N/wAE6P2Rv+CYv7Efxs+If/BEb4ZeLtT8e/Grxv8ACbV5/iZ8Qp5FtLaMS2aW40ZEil3gCO6kuPJBYpgM7l1Xy/50Pg58Afi78Z/2hdC/Zy+E/hu51HxnrPiWPSNKsLQlXN2Zdmd38CqQWZzgKqljgA19lf8ABzp4b8EeEv8Agrt4x8P+E/EJ1S+tfCnhyHxVePMJHk1SPSreOVpGAAMjIkTOQB8zNwOlfIf7NP7Xv7Tv7HHi2+8d/st/HHxF4F1fUtPNjqF/4d1BoHuLcur+W+OGG5VIz0I4rnPC/wAYviv4J+Kdt8cPCHxG1rTfGNnqp1O28UWepSR38d4WLm4E4O/zCxJLZySTnrX6xf8ABGKO2/ZL/wCCPH7T3/BXH4Y2UNz8cNLvZPDGg+JddT7Suk204tmmnt0+UrcM9wWMjM2TEgxt3q/5D+JvE3iPxp4jv/GHjDXrzVNW1S8ku9S1PULlpp7qeRi8kskjks7sxJLEkkkk1//Z', 'a.png')
