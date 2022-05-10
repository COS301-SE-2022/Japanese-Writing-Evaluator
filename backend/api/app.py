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

@app.rout('/register', methods = ('POST, GET'))
def register():
    try:
        email = str(request.json['username'])
        user = db.getUserByEmail(email)
        if user == email:
            res = "User already exists"
            return jsonify({"response": res}), 200
        else
            db.register(str(request.json['email']), str(request.json['password']), str(request.json['username']))
            res = "Registration Successful"
            return jsonify({'response': res}), 200

    except Exception as e
        return jsonify({'response': str(e)}), 400


if __name__ == '__main__':
    app.run(debug = True)
