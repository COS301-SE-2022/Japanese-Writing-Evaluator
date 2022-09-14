import json
import os
import pyrebase
from flask import jsonify

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

    def getUserAnalytics(self):
        store = self.db.getImageUsers()
        analytics = []
        sum = 0
        count = 0

        for i in store:
            year = i[5].strftime("%Y-%m-%d").split('-')[0]
            month = i[5].strftime("%Y-%m-%d").split('-')[1]
            character = i[2]

            if len(analytics) == 0:
                for j in store:
                    if j[2] == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics.append({
                    year:{
                        month:{
                            "character": i[2],
                            "average score": sum/count
                        }
                    }
                })
                sum = 0
                count = 0


            if year and month and character not in analytics:
                for j in store:
                    if j[2] == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics.append({
                    year:{
                        month:{
                            "character": i[2],
                            "average score": sum/count
                        }
                    }
                })
                sum = 0
                count = 0

            elif year and month in analytics and character not in analytics[0]:
                for j in store:
                    if j[2] == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == [5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                dat = json.dumps(analytics)
                analytics = json.loads(dat)
                analytics[0]["{}".format(year)][month]["average score"] = "here"
                sum = 0
                count = 0

            # elif year in analytics and month and character not in analytics:
            else:
                for j in store:
                    if j[2] == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == [5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1

                dat = json.dumps(analytics)
                analytics = json.loads(dat)
                analytics[0][year] = {month:{ "character": i[2], "average score": sum/count}}
                sum = 0
                count = 0


        dat = json.dumps(analytics)
        analytics = json.loads(dat)
        return jsonify({'response': analytics}), 200    

