from flask import Flask, jsonify, request
import hashlib
import uuid

import sys
sys.path.append('../database')

from database import Database

app = Flask(__name__)
db = Database()

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
        user = str(request.json['username'])
        Finduser = db.getUserByEmail(str(request.json['email']))
        if Finduser == user:
            res = "User already exists"
            return jsonify({"response": res}), 200
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
def uplaodImage():
    succ = db.saveImage(int(request.json["id"]), str(request.json["image_path"]), str(request.json["image_char"]), int(request.json["score"]))
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
def viewImages():
    images = db.getImage(str(request.json["id"]))
    if images:
        return jsonify({'response': images}), 200
    else:
        return jsonify({'response': "view image failed."}), 401

#get the user details 
#return json response being the user id and username
@app.route('/login', methods=['GET'])
def login():
    email = str(request.json["email"])
    password = str(request.json["password"])
    user = db.getUser(password, email)
    #user holds username and user id to be stored locally
    if user == None: 
        return jsonify({'response': "user not found."}), 401
    else: 
        return jsonify({'response': user}), 200
if __name__ == '__main__':
    app.run(debug = True)
