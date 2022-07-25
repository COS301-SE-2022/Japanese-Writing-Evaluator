import os
import pyrebase

class imageDB:
    def __init__(self,db):
        self.db = db
        
    def saveToDB(self, id, file, image_char, score):
        image_path = "/users/"+str(id)+"/"+file
        return self.db.saveImage(id, image_path, image_char, score)

    def getImages(self, id):
        return self.db.getImage(id)

    def getImageUsers(self):
        return self.db.getImageUsers()

    def getUser(self, id):
        return self.db.getUserByID(id)