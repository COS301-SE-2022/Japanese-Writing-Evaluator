from functools import wraps
from operator import contains
from pydoc import importfile
import this
from urllib import response
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from datetime import datetime, timedelta
import jwt
import os
from flask_cors import CORS;
from schedule import every, repeat, run_pending
import time
import numpy as np
import requests

import sys
sys.path.insert(0, '../database')
sys.path.insert(1, '../email_user')

from database import Database
from authentication import Authentication
from image import Image
from feedback import Feedback
from send_email import Send_Email
import event_bus

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY']= os.getenv('SECRET_KEY')
db = Database()
auth = Authentication(db)
img = Image(db)
feedback = Feedback(db)
send = Send_Email()
CORS(app)

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            token = request.headers['user-token']
        if not token:
            return jsonify({'arlet' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'arlet' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
  
    return decorated 


@app.route('/')
def lancher():
    return "At lancher"


"""
    callResetPassword function:
        calls update password to change the password
    request body: 
        email: the email of a registed user
        password: their new password
    return:
        json response from resetPassword
"""
@app.route('/password/reset', methods = ['PUT'])
def callResetPassword():
    # return auth.resetPassword(str(request.json["email"]), str(request.json["password"]))
    return event_bus.event_resetPassword(str(request.json["email"]), str(request.json["password"]))

"""
    call Register function:
        calls the register function from authentication.py
    request body: 
        email: the email of a new user
        password: their password
        username: and their username
    return:
        json response from resetPassword
"""
@app.route('/register', methods = ['POST', 'GET'])
def callRegister():
    # return auth.register(str(request.json['email']), str(request.json['password']), str(request.json['username']))
    return event_bus.event_register(str(request.json['email']), str(request.json['password']), str(request.json['username']))

"""
    callUploadImage function:
        calls uploadImage function from image.py
    request body: 
        email
        password
    return:
        json response
"""
@app.route('/upload', methods = ['POST'])
@token_required
def callUploadImage():
    # return img.uploadImage(int(request.json["id"]), str(request.json["imagechar"]), str(request.json["image"]), str(request.json["file"]))
    return event_bus.event_uploadImage(int(request.json["id"]), str(request.json["imagechar"]), str(request.json["image"]), str(request.json["file"]))

"""
    callViewImages function:
        calls view image function from image.py
    request body: 
        id: the user's id
    return:
        json response
"""

@app.route('/progress', methods = ['GET', 'POST'])
@token_required
def callViewImages():
    return event_bus.event_progress(int(request.json["id"]))



"""
    login function:
        return the user if they exist
    request body: 
        email: the email of a registered user
        password: their password
    return:
        json response
"""
@app.route('/login', methods=['GET', 'POST'])
def login():
    user = event_bus.event_login(str(request.json["email"]), str(request.json["password"]))
    if user == None: 
        return jsonify({'response': "user not found."}), 401
    else: 
        session["logged_in"] = True
        token = jwt.encode({
            'username' : user[0],
            'id': user[1],
            'experation': str(datetime.utcnow() + timedelta(seconds=120)),
        }, app.config['SECRET_KEY'], "HS256")
        return jsonify({'response': 'user login succesful', 'user-token':token, 'data': user}), 200

"""
    home function:
        calls getCharacters to send character url's to front-end for the homepage
    request body:

    return:
        json response with image url's
"""
@app.route('/home', methods=['GET'])
def home():
    return event_bus.event_getCharacters()

@app.route('/feedback', methods = ['GET','POST'])
@token_required
def userfeedback():
    progress = feedback.getuserfeedback(db,str(request.json["id"]))
    return progress


"""
    email function:
        calls send_email function which send emails to all users
    request body:

    return:
        
"""
@repeat(every().sunday)
def email_users():
    users = db.getImageUsers()

    keep = []
    for i in users:
        if(keep.count(i[0]) == 0):
            keep.append(i[0])

    store = [[0] * 2 for i in range(len(keep))]
    stored = []
    iCount = 0
    jCount = 0
    divBy = 0
    average = 0
    for i in users:
        if(stored.count(i[0]) == 0):
            stored.append(i[0])
            store[jCount][0] = i[0]

            for j in users:
                if(j[0] == store[jCount][0]):
                    average += j[3]
                    divBy += 100
                # store[jCount][1] = 22
                    
            score = (average/divBy) * 100
            store[jCount][1] = "{:.2f}".format(score)
            jCount += 1

        
        iCount += 1
        divBy = 0
        average = 0
        score = 0

    contain = []
    for i in store:
        thisUser = db.getUserByID(i[0])
        if(thisUser != None):
            response = requests.get("https://isitarealemail.com/api/email/validate", params = {'email': thisUser[1]}, headers = {'Authorization': "Bearer " + os.getenv('email_api_key')})

            valid = response.json()['status']

            if(valid == "valid"):
                contain.append(send.send_email(thisUser[1], round(float(i[1]), 2), thisUser[5]))
            else:
                contain.append("Failed")
    
    if(contain.count("Failed") > 0):
        return jsonify({'response': "Failed"}), 401
    else:
        return jsonify({'response': "Emails successfully sent"}), 200

"""
    callGuestUploadImage function:
        calls guestUploadImage function from image.py
    request body: 
        email
        password
    return:
        json response
"""
@app.route('/guest/upload', methods = ['POST'])
def callGuestUploadImage():
    return event_bus.event_guestUplaodImage(str(request.json["imagechar"]), str(request.json["image"]))

if __name__ == '__main__':
    app.run(debug = True)
