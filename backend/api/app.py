from functools import wraps
from flask import Flask, jsonify, request, session
from datetime import datetime, timedelta
import jwt
import os
from flask_cors import CORS;

import sys
sys.path.append('../database')

from database import Database
from authentication import Authentication
from image import Image
from feedback import Feedback

app = Flask(__name__)
app.config['SECRET_KEY']= os.getenv('SECRET_KEY')
db = Database()
auth = Authentication()
img = Image()
feedback = Feedback(db)
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
    resetPassword function:
        calls update password to change the password
    request body: 
        email
        password
    return:
        json response
"""
@app.route('/password/reset', methods = ['PUT'])
def callResetPassword():
    return auth.resetPassword(str(request.json["email"]), str(request.json["password"]))

"""

    Register
    Takes in a post or get request and adds the user to the database

"""

@app.route('/register', methods = ['POST', 'GET'])
def register():
    return auth.register(db, str(request.json['email']))

"""
    resetPassword function:
        calls update password to change the password
    request body: 
        email
        password
    return:
        json response
"""

@app.route('/upload', methods = ['POST'])
@token_required
def uplaodImage():
    return img.uplaodImage(db, int(request.json["id"]), str(request.json["imagepath"]), str(request.json["imagechar"]), int(request.json["score"]))

"""
    viewImages function:
        calls get images to send the url to front-end 
    request body: 
        id: the user id
    return:
        json response
"""
@app.route('/view', methods = ['GET'])
@token_required
def viewImages():
    return img.uplaodImage(db, int(request.json["id"]))



#get the user details 
#return json response being the user id and username
@app.route('/login', methods=['GET', 'POST'])
def login():
    user = auth.login(db,str(request.json["email"]), str(request.json["password"]))
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

@app.route('/feedback', methods = ['GET','POST'])
@token_required
def userfeedback():
    progress = feedback.getuserfeedback(db,str(request.json["id"]))
    return progress



if __name__ == '__main__':
    app.run(debug = True)
