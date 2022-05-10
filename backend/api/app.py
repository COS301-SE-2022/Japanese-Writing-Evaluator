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
    resetPassword function:
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

if __name__ == '__main__':
    app.run(debug = True)