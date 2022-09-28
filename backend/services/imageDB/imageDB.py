from functools import wraps
import jwt
import json
import os
import pyrebase
from flask import jsonify
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;
import psycopg2
import requests
from datetime import date
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})

try:
    conn2 = psycopg2.connect(host = os.getenv('Image_host'), database = os.getenv('Image_db'), user = os.getenv('Image_user'), password = os.getenv('Image_pass'))
    curr2 = conn2.cursor()
except Exception as e:
    print("Could not connect to database", e)
    
def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        imgdb_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            imgdb_token = request.headers['user-token']
        if not imgdb_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(imgdb_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
    
    return decorated

"""
saveToDB function:
    Saves users uploaded image information to database
parameters: 
    id, file, imageChar, score, writingStyle
return:
    response from db
"""
@app.route("/saveToDB", methods=["POST"])
@token_required
def saveToDB():
    id = request.json["id"]
    imageChar = request.json["imagechar"]
    score = request.json["score"]
    writingStyle = request.json["style"]
    file = request.json["file"]

    imagePath = "/users/"+str(id)+"/"+file
    success = saveImage(id, imagePath, imageChar, score, writingStyle)
    if(success == True):
        return jsonify({"response": "upload successful"}), 200
    else:
        return jsonify({"response": "upload unsuccessful"}), 400

def saveImage(id, image_path, image_char, score, writing_style):
    upload_query = "INSERT INTO image(id, image_path, character, writing_style, score, upload_date) VALUES(%s, %s, %s, %s, %s, %s);"
    curr2.execute(upload_query, (id, image_path, image_char, writing_style, score, date.today()))
    conn2.commit()
    return True

"""
getImages function:
    gets all the users uploaded images
parameters: 
    id
return:
    response from db
"""
@app.route("/getImages", methods=["POST"])
@token_required
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
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        call = requests.post(os.getenv("image") + "/viewImages", headers = headers, json = {"images": imgs})
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
def getImage():
    users = getImageUsers()
    res = []
    for i in users:
        res.append(i)
    return jsonify({"response": res}), 200

@app.route("/getUserAnalytics", methods=["GET"])
def getUserAnalytics():
    store = getImageUsers()
    analytics = []
    sum = 0
    count = 0

    months = []
    styles = []

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
                "year": year,
                "months": [{
                    "month": month,
                    "writingStyles": [{
                        "averageScore": sum/count,
                        "writingStyle": character
                    }]
                }]
            })
            styles.append(character)
            months.append(month)
            sum = 0
            count = 0

        elif year in analytics[current]["year"]:
            if(month not in months):
                styles.clear()
                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics[current]["months"].append({"month": month, "writingStyles": [{"averageScore": sum/count, "writingStyle": character}]})
                months.append(month)
                styles.append(character)
                sum = 0
                count = 0

            else:
                if(character not in styles):
                    for j in store:
                        if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                            sum += j[3]
                            count += 1
                    analytics[current]["months"][months.index(month)]["writingStyles"].append({"averageScore": sum/count, "writingStyle": character})
                    styles.append(character)
                    sum = 0
                    count = 0

        else:
            months.clear()
            styles.clear()
            for j in store:
                if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                    sum += j[3]
                    count += 1
            analytics.append({
                "year": year,
                "months": [{
                    "month": month,
                    "writingStyles": [{
                        "averageScore": sum/count,
                        "writingStyle": character
                    }]
                }]
            })
            sum = 0
            count = 0
            months.append(month)
            styles.append(character)

    return jsonify({'response': analytics}), 200    

@app.route("/getFrequency", methods=["GET"])
@token_required
def getFrequency():
    store = getImageUsers()
    analytics = []
    sum = 0
    count = 0
    
    months = []

    for i in store:
        year = i[5].strftime("%Y-%m-%d").split('-')[0]
        month = i[5].strftime("%Y-%m-%d").split('-')[1]
        character = i[4].lower()
        current = int(year) - 2022

        if len(analytics) == 0 or current > len(analytics):
            for j in store:
                if year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                    sum += j[3]
                    count += 1
            analytics.append({
                    "year": year,
                    "months":[{
                        "month": month,
                        "frequency": count
                    }]
            })
            months.append(month)
            sum = 0
            count = 0
        
        elif year in analytics[current]["year"]:
            if(month not in months):
                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics[current]["months"].append({"month": month, "frequency": count})
                months.append(month)
                sum = 0
                count = 0
        else:
            months.clear()
            for j in store:
                if year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                    sum += j[3]
                    count += 1
            analytics.append({
                    "year": year,
                    "months":[{
                        "month": month,
                        "frequency": count
                    }]
            })
            months.append(month)
            sum = 0
            count = 0
            
    return jsonify({'response': analytics}), 200    

"""
    getImageUsers function:
        returns all users with id's in images database
    arguments:

    return:
        array of all entries in image database
"""
def getImageUsers():
    getUsers = "SELECT * FROM image";
    curr2.execute(getUsers)
    users = curr2.fetchall()
    return users

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
    # app.run(debug = True, port = 5003)
    app.run(port=int(os.environ.get("PORT", 5003)),host='0.0.0.0',debug=True)