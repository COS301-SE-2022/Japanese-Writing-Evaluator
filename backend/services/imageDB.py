from heapq import merge
import json
import os
import pyrebase
from flask import jsonify
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;
import psycopg2
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)

try:
    conn2 = psycopg2.connect(host = os.getenv('Image_host'), database = os.getenv('Image_db'), user = os.getenv('Image_user'), password = os.getenv('Image_pass'))
    curr2 = conn2.cursor()
except Exception as e:
    print("Could not connect to database", e)
    
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
@app.route("/getImages", methods=["POST"])
def getImages():
    id = request.json["id"]
    view_query = "SELECT * FROM image WHERE id=%s ORDER BY  upload_date DESC;"
    curr2.execute(view_query, ([id]))
    images = curr2.fetchall()

    if(len(images) > 0):
        # print(images)
        imgs = []
        for i in images:
            imgs.append((i[0], i[1], i[2], i[3], i[4], i[5].strftime("%Y-%m-%d")))
        print(imgs)
        call = requests.post("http://127.0.0.1:5004/viewImages", json = {"images": imgs})
        return call.json()
    else:
        return jsonify({'response': "no user images"}), 400    

"""
getImagesUsers function:
    gets all image information from database
parameters: 
    none
return:
    response from db
"""
@app.route("/getImageUsers", methods=["GET"])
def getImageUsers():
    getUsers = "SELECT * FROM image";
    curr2.execute(getUsers)
    users = curr2.fetchall()
    print(users)
    res = []
    for i in users:
        res.append(i)
    return jsonify({"response": res}), 200

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

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
    app.run(debug = True, port = 5003)