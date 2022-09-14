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
            analytics.append({
            "year": str(i[5].strftime("%Y-%m-%d").split('-')[0]),
            "month": str(i[5].strftime("%Y-%m-%d").split('-')[1]),
            "character": str(i[2]),
            "score": i[3]
            })

        ret = {}
        for i in analytics:
            if i["year"] and i["month"] and i["character"] not in ret:
                for j in analytics:
                    if j["year"] == i["year"] and j["month"] == i["month"] and j["character"] == i["character"]:
                        sum += j["score"]
                        count += 1
                ret.append({
                    i["year"]:{
                        i["month"]:{
                            "average score": sum/count,
                            "character": i["character"]
                        }
                    }
                })
            if i["year"] and i["month"] in ret and i["character"] not in ret:
                    for j in analytics:
                        if j["year"] == i["year"] and j["month"] == i["month"] and j["character"] == i["character"]:
                            sum += j["score"]
                            count += 1

        # for i in store:
        #     year = str(i[5].strftime("%Y-%m-%d").split('-')[0])
        #     month = str(i[5].strftime("%Y-%m-%d").split('-')[1])
        #     character = str(i[2])

        #     if len(analytics) == 0:
        #         for j in store:
        #             if j[2] == character and year == str(j[5].strftime("%Y-%m-%d").split('-')[0]) and month == str(j[5].strftime("%Y-%m-%d").split('-')[1]):
        #                 sum += j[3]
        #                 count += 1
        #         analytics.append({
        #             year:{
        #                 month:{
        #                     "character": i[2],
        #                     "average score": sum/count
        #                 }
        #             }
        #         })
        #         sum = 0
        #         count = 0
        #         continue

        #     if year not in analytics[0] and month not in analytics[0][year] and character not in analytics[0][year][month] :
        #         for j in store:
        #             if j[2] == character and year == str(j[5].strftime("%Y-%m-%d").split('-')[0]) and month == str(j[5].strftime("%Y-%m-%d").split('-')[1]):
        #                 sum += j[3]
        #                 count += 1
        #         analytics.append({
        #             year:{
        #                 month:{
        #                     "character": i[2],
        #                     "average score": sum/count
        #                 }
        #             }
        #         })
        #         sum = 0
        #         count = 0

        #     elif year in analytics[0] and month in analytics[0][year] and character not in analytics[0][year][month]:
        #     # elif year and month in analytics and character not in analytics[0]:
        #         for j in store:
        #             if j[2] == character and year == str(j[5].strftime("%Y-%m-%d").split('-')[0]) and month == str(j[5].strftime("%Y-%m-%d").split('-')[1]):
        #                 sum += j[3]
        #                 count += 1
        #         dat = json.dumps(analytics)
        #         analytics = json.loads(dat)
        #         analytics[0]["{}".format(year)][month]["average score"] = "here"
        #         sum = 0
        #         count = 0

        #     # elif year in analytics and month and character not in analytics:
        #     else:
        #         for j in store:
        #             if j[2] == character and year == str(j[5].strftime("%Y-%m-%d").split('-')[0]) and month == str(j[5].strftime("%Y-%m-%d").split('-')[1]):
        #                 sum += j[3]
        #                 count += 1

        #         dat = json.dumps(analytics)
        #         analytics = json.loads(dat)
        #         analytics[0][year] = {month:{ "character": i[2], "average score": sum/count}}
        #         sum = 0
        #         count = 0


        # dat = json.dumps(analytics)
        # analytics = json.loads(dat)
        return jsonify({'response': ret}), 200    

