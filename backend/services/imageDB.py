import os
import pyrebase

class imageDB:
    def __init__(self,db):
        self.db = db
        
    """
    saveToDB function:
        Saves users uploaded image information to database
    parameters: 
        id, file, imageChar, score, writingStyle
    return:
        response from db
    """
    def saveToDB(self, id, file, imageChar, score, writingStyle):
        imagePath = "/users/"+str(id)+"/"+file
        return self.db.saveImage(id, imagePath, imageChar, score, writingStyle)

    """
    getImages function:
        gets all the users uploaded images
    parameters: 
        id
    return:
        response from db
    """
    def getImages(self, id):
        return self.db.getImage(id)

    """
    getImagesUsers function:
        gets all image information from database
    parameters: 
        none
    return:
        response from db
    """
    def getImageUsers(self):
        return self.db.getImageUsers()