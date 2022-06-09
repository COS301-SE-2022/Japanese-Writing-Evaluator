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
img = Image(db)
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
    return auth.resetPassword(str(request.json["email"]), str(request.json["password"]))

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
    return auth.register(str(request.json['email']), str(request.json['password']), str(request.json['username']))

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
    return img.uploadImage(int(request.json["id"]), str(request.json["imagechar"]), str(request.json["image"]), str(request.json["file"]))

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
    return img.viewImages(int(request.json["id"]))



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
    user = auth.login(str(request.json["email"]), str(request.json["password"]))
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
    return img.getCharacters()

@app.route('/feedback', methods = ['GET','POST'])
@token_required
def userfeedback():
    progress = feedback.getuserfeedback(db,str(request.json["id"]))
    return progress

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
    return img.guestUploadImage(str(request.json["imagechar"]), str(request.json["image"]))


if __name__ == '__main__':
    app.run(debug = True)
