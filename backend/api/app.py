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


if __name__ == '__main__':
    app.run(debug = True)