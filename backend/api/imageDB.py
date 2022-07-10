import os
import pyrebase

class imageDB:
    def __init__(self,db):
        self.db = db
        
    #Image information service
    def saveToDB(self, id, file, image_char, score):
        image_path = "/users/"+str(id)+"/"+file
        return self.db.saveImage(id, image_path, image_char, score)
