from heapq import merge
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
            character = i[4].lower()
            current = int(year) - 2022

            if len(analytics) == 0 or current > len(analytics):

                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics.append({
                    year:{
                        "year": year,
                        month:{
                            "month": month,
                            character: {
                                "writingStyle": character,
                                "averageScore": sum/count}
                        }
                    }
                })
                sum = 0
                count = 0

            elif year in analytics[current] and month in analytics[current][str(year)] and character not in analytics[current][str(year)][str(month)]:
                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                
                z = {
                    character: {
                        "writingStyle": character,
                        "averageScore": sum/count}
                }
                analytics[current][str(year)][str(month)].update(z)
                sum = 0
                count = 0
            
            else:
                for j in store:
                    if j[4].lower() == character and year == str(j[5].strftime("%Y-%m-%d").split('-')[0]) and month == str(j[5].strftime("%Y-%m-%d").split('-')[1]):
                        sum += j[3]
                        count += 1

                z = {month: {
                    "month": month,
                    character: { 
                        "writingStyle": character,
                        "averageScore": sum/count}}}
                analytics[current][str(year)].update(z) 
                sum = 0
                count = 0

        return jsonify({'response': analytics}), 200    

