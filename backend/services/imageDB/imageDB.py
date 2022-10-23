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
        if 'user-token' in request.headers:
            imgdb_token = request.headers['user-token']
        if not imgdb_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(imgdb_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except Exception:
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
    try:
        upload_query = "INSERT INTO image(id, image_path, character, writing_style, score, upload_date) VALUES(%s, %s, %s, %s, %s, %s);"
        curr2.execute(upload_query, (id, image_path, image_char, writing_style, score, date.today()))
        conn2.commit()
        return True
    except Exception:
        return False

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
    try:
        id = request.json["id"]
        view_query = "SELECT * FROM image WHERE id=%s ORDER BY  upload_date DESC;"
        curr2.execute(view_query, ([id]))
        images = curr2.fetchall()
    except Exception:
        return jsonify({"response": "Database connection failed"}), 400

    if(len(images) > 0):
        imgs = []
        for i in images:
            imgs.append((i[0], i[1], i[2], i[3], i[4], i[5].strftime("%Y-%m-%d")))
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        try:
            call = requests.post(os.getenv("image") + "/viewImages", headers = headers, json = {"images": imgs})
            return call.json()
        except Exception:
            return jsonify({"response": "Connection to image service failed"}), 400
        
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
    if(store == 0):
        return jsonify({"response": "Database Connection Failed"}), 400
    else:
        analytics = []

        analytics_months = []
        styles = []
        analytics_sum = 0
        analytics_count = 0

        for i in store:
            year = i[5].strftime("%Y-%m-%d").split('-')[0]
            character = i[4].lower()
            month = i[5].strftime("%Y-%m-%d").split('-')[1]
            current = int(year) - 2022

            if len(analytics) == 0 or current > len(analytics):

                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        analytics_count += 1
                        analytics_sum += j[3]
                analytics.append({
                    "year": year,
                    "months": [{
                        "month": month,
                        "writingStyles": [{
                            "writingStyle": character,
                            "averageScore": analytics_sum/analytics_count
                        }]
                    }]
                })
                styles.append(character)
                analytics_count = 0
                analytics_months.append(month)
                analytics_sum = 0

            elif year in analytics[current]["year"]:
                if(month not in analytics_months):
                    styles.clear()
                    for j in store:
                        if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                            analytics_sum += j[3]
                            analytics_count += 1
                    analytics[current]["months"].append({"month": month, "writingStyles": [{"averageScore": analytics_sum/analytics_count, "writingStyle": character}]})
                    analytics_months.append(month)
                    analytics_sum = 0
                    styles.append(character)
                    analytics_count = 0

                else:
                    if(character not in styles):
                        for j in store:
                            if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                                analytics_sum += j[3]
                                analytics_count += 1
                        analytics[current]["months"][analytics_months.index(month)]["writingStyles"].append({"averageScore": analytics_sum/analytics_count, "writingStyle": character})
                        analytics_sum = 0
                        styles.append(character)
                        analytics_count = 0

            else:
                analytics_months.clear()
                styles.clear()
                for j in store:
                    if j[4].lower() == character and year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        analytics_count += 1
                        analytics_sum += j[3]
                analytics_sum = 0
                analytics_count = 0
                analytics.append({
                    "months": [{
                        "writingStyles": [{
                            "averageScore": analytics_sum/analytics_count,
                            "writingStyle": character
                        }],
                        "month": month
                    }],
                    "year": year
                })
                analytics_months.append(month)
                styles.append(character)

        return jsonify({'response': analytics}), 200    

@app.route("/getFrequency", methods=["GET"])
@token_required
def getFrequency():
    store = getImageUsers()
    
    if(store == 0):
        return jsonify({"response": "Database connection failed"}), 400
    else:
        analytics = []
        sum = 0
        count = 0
        
        months = []

        for i in store:
            year = i[5].strftime("%Y-%m-%d").split('-')[0]
            character = i[4].lower()
            month = i[5].strftime("%Y-%m-%d").split('-')[1]
            current = int(year) - 2022

            if len(analytics) == 0 or current > len(analytics):
                for j in store:
                    if year == j[5].strftime("%Y-%m-%d").split('-')[0] and month == j[5].strftime("%Y-%m-%d").split('-')[1]:
                        sum += j[3]
                        count += 1
                analytics.append({
                        "year": year,
                        "months":[{
                            "frequency": count,
                            "month": month
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
                    months.append(month)
                    analytics[current]["months"].append({"month": month, "frequency": count})
                    count = 0
                    sum = 0
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
    try:
        getUsers = "SELECT * FROM image";
        curr2.execute(getUsers)
        users = curr2.fetchall()
        return users
    except Exception:
        return 0

@app.route("/delete", methods=["DELETE"])
@token_required
def deleteUserImages():
    images = getUserImages(request.json["id"])
    if(images == 0):
        return jsonify({"response": "Database connection failed"}), 400
    else:
        if(len(images) > 0):
            paths = []
            for i in images:
                paths.append(i[1])
            try:
                headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
                firebaseDelete = requests.delete(os.getenv("image") + "/delete", json={"paths": paths}, headers=headers)
            except Exception:
                return jsonify({"response": "Connection to image service failed"}), 400
            if(firebaseDelete.status_code == 200 or firebaseDelete.status_code == 203):
                delete = deleteImages(request.json["id"])
                if(delete == True):
                    try:
                        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
                        userDelete = requests.delete(os.getenv("authentication") + "/delete", json={"id": request.json["id"]}, headers=headers)
                    except Exception:
                        return jsonify({"response": "Connection to authentication service failed"}), 400
                    if(userDelete.status_code == 200 and firebaseDelete.status_code == 203):
                        return jsonify({"response": "All user data successfully deleted, the following files could not be found", "paths": firebaseDelete.json()["images"]}), 200
                    elif(userDelete.status_code == 200):
                        return jsonify({"response": "All user data successfully deleted"}), 200
                    else:
                        return jsonify({"response": "Failed to delete user from database"}), 400
                else:
                    return jsonify({"response": "Image deletion from database failed"}), 400
            else:
                return jsonify({"response": "Deletion from storage failed"}), 400
        else:
            try:
                headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
                userDelete = requests.delete(os.getenv("authentication") + "/delete", json={"id": request.json["id"]}, headers=headers)
            except Exception:
                return jsonify({"response": "Connection to authentication service failed"}), 400
            if(userDelete.status_code == 200):
                return jsonify({"response": "All user data successfully deleted"}), 200
            else:
                return jsonify({"response": "Failed to delete user from database"}), 400

def getUserImages(id):
    try:
        view_query = "SELECT * FROM image WHERE id=%s ORDER BY  upload_date DESC;"
        curr2.execute(view_query, ([id]))
        images = curr2.fetchall()
        return images
    except Exception:
        return 0

def deleteImages(id):
    try:
        delete_query = "DELETE FROM image WHERE id=%s"
        curr2.execute(delete_query, (id,))
        conn2.commit()
        return True
    except:
        return False

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 5003)),host='0.0.0.0',debug=False)