from functools import wraps
from flask import Flask, jsonify, request, session
from datetime import datetime, timedelta
import jwt
import hashlib
import uuid
from flask_cors import CORS;

import sys
sys.path.append('../database')

from backend.database.database import Database

app = Flask(__name__)
app.config['SECRET_KEY']='459758192b5ba092efb54f9094237481'
db = Database()
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
def resetPassword():
    editedRow = db.updatePassword(str(request.json["email"]), str(request.json["password"])
)
    if editedRow == 1:
        return jsonify({'response': "password reset successful."}), 200
    else:
        return jsonify({'response': "password reset failed."}), 401

"""

    Register
    Takes in a post or get request and adds the user to the database

"""

@app.route('/register', methods = ['POST', 'GET'])
def register():
    try:
        Finduser = db.getUserByEmail(str(request.json['email']))
        if Finduser != None:
            res = "User already exists"
            return jsonify({"response": res}), 409
        else:
            password = str(request.json['password'])
            salt = uuid.uuid4().hex
            passwordSalt = hashlib.sha512((password + salt).encode()).hexdigest()
            db.addUser(str(request.json['username']), str(request.json['password']), str(request.json['email']), False, passwordSalt, 0)
            res = "Registration Successful"
            return jsonify({'response': res}), 200

    except Exception as e:
        return jsonify({'response': str(e)}), 400


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
    succ = db.saveImage(int(request.json["id"]), str(request.json["imagepath"]), str(request.json["imagechar"]), int(request.json["score"]))
    if succ:
        return jsonify({'response': "image upload successful."}), 200
    else:
        return jsonify({'response': "image upload failed."}), 401

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
    images = db.getImage(int(request.json["id"]))
    if images:
        return jsonify({'response': images}), 200
    else:
        return jsonify({'response': "view image failed."}), 401

#get the user details 
#return json response being the user id and username
@app.route('/login', methods=['GET', 'POST'])
def login():
    email = str(request.json["email"])
    password = str(request.json["password"])
    user = db.getUser(password, email)
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
if __name__ == '__main__':
    app.run(debug = True)
