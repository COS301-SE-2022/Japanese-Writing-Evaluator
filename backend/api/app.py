from flask import Flask, jsonify, request

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

    #get the user details 
    #return json response being the user id and username

@app.route('/login', methods=['GET'])
def login():
    username = str(request.json["username"])
    password = str(request.json["password"])
    user = db.getUser(password, username)
    print(user)
    #user holds username and user id to be stored locally
    if user == None: 
        return jsonify({'response': "user not found."}), 401
    else: 
        return jsonify({'response': user}), 200
if __name__ == '__main__':
    app.run(debug = True)