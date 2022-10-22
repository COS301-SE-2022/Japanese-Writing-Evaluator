import base64
from functools import wraps
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, redirect
import jwt
import os
from flask_cors import CORS;
from schedule import every, repeat
import requests

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://localhost:8100", "http://localhost:80", "https://633168369b681d4d5be0b5ed--musical-taiyaki-627c6d.netlify.app/"]}})

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            token = request.headers['user-token']
        if not token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except Exception:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)
  
    return decorated 

authFail = "Connection to authentication service failed"
fail = "Connection to evaluation service failed"
imgDBFail = "Connection to image database service failed"
"""
    callResetPassword function:
        calls update password to change the password
    request body: 
        email: the email of a registed user
        password: their new password
    return:
        json response from resetPassword
"""
@app.route('/forgot-password-email', methods = ['POST'])
def callResetPassword():
    try:
        send = requests.get(os.getenv("authentication") + "/findUser", json = {"email": request.json["email"]})
        return send.json()
    except Exception:
        return jsonify({"response": authFail}), 400

@app.route('/forgot-password-password', methods = ['PUT'])
def resetPassword():
    try:
        send = requests.put(os.getenv("authentication") + "/reset-password", json = {"token": request.json['token'], "password": request.json['password']})
        return send.json()
    except Exception:
        return jsonify({"response": authFail}), 401

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
@app.route('/register', methods = ['POST'])
def callRegister():
    try:
        send = requests.post(os.getenv("authentication") + "/register", json = {"email": request.json['email'], "password": request.json['password'], "username": request.json['username']})
        return send.json()
    except Exception:
        return jsonify({"response": authFail}), 401

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
    image = request.json["image"]

    eval = 0
    headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
    if(request.json["style"].lower() == "hiragana"):

        try:
            eval = requests.post(os.getenv("hiragana") + "/hiragana", json = {"image": image}, headers = headers)
        except Exception:
            return jsonify({"response": fail}), 401

    elif(request.json["style"].lower() == "katakana"):

        try:
            eval = requests.post(os.getenv("katakana") + "/katakana", json = {"image": image}, headers = headers)
        except Exception:
            return jsonify({"response": fail}), 401

    else:

        try:
            eval = requests.post(os.getenv("kanji") + "/kanji", json = {"image": image}, headers = headers)
        except Exception:
            return jsonify({"response": fail}), 401

    if(eval.status_code == 200):
        score = eval.json()["score"]
        strokes = eval.json()["strokes"]
        if(score == 0):
            return jsonify({'response': "image evaluation failed."}), 401
        else:

            try:
                exitcode = requests.post(os.getenv("image") + "/uploadImage", json = {"id": request.json["id"], "image": request.json["image"], "file": request.json["file"]}, headers=headers)
            except Exception:
                return jsonify({"response": "Connection to image service failed"}), 400

            if(exitcode.status_code == 200):

                try:
                    storeToDB = requests.post(os.getenv("imageDB") + "/saveToDB", headers=headers, json = {"id": request.json["id"], "style": request.json["style"], "score": score, "imagechar": request.json["imagechar"], "file": request.json["file"]}).json()['response']
                except Exception:
                    return jsonify({"response": imgDBFail}), 401

                if(storeToDB == "upload successful"):
                    return jsonify({'response': "image upload successful", 'data': {'strokes': strokes,'score': score}}), 200
                else:
                    return jsonify({'response': "Database storage failed"}), 401
            else:
                return jsonify({'response': "Storage to cloud service failed"}), 401
    else:
        return eval.json()
"""
    callViewImages function:
        calls view image function from image.py
    request body: 
        id: the user's id
    return:
        json response
"""

@app.route('/progress', methods = ['POST'])
@token_required
def callViewImages():
    try:
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        send = requests.post(os.getenv("imageDB") + "/getImages", headers = headers, json = {"id": request.json["id"]})
        return send.json()
    except Exception:
        return jsonify({"response": imgDBFail}), 400

"""
    login function:
        return the user if they exist
    request body: 
        email: the email of a registered user
        password: their password
    return:
        json response
"""
@app.route('/login', methods=['POST'])
def login():
    headers = {'content-type': 'application/json'}
    try:
        user = requests.post(os.getenv("authentication") + "/login", json = {"email": request.json["email"], "password": request.json["password"]}, headers = headers)
    except Exception:
        return jsonify({"response": authFail}), 401

    print(user.json()["response"])
    if user.status_code == 200: 
        session["logged_in"] = True
        token = jwt.encode({
            'username' : user['response']['username'],
            'id': user['response']['id'],
        }, app.config['SECRET_KEY'], "HS256")
        return jsonify({'response': 'user login succesful', 'user-token':token, 'data': user['data']}), 200

"""
    logout function
        kills the session and token
    request boby:
        None
    return:
        json response
"""
@app.route('/logout', methods=['DELETE'])
@token_required
def logout():
    try:
        session["logged_in"] = False
        session.clear()
        return jsonify({"response": 'logged out'}), 200
    except Exception:
        return jsonify({"response": 'Error'}), 401
        
"""
    home function:
        calls getCharacters to send character url's to front-end for the homepage
    request body:

    return:
        json response with image url's
"""
@app.route('/home', methods=['GET'])
def home():
    return None

"""
    email function:
        calls send_email function which send emails to all users
    request body:

    return:
        
"""
@repeat(every().sunday)
def email_users():
    try:
        imgs = requests.get(os.getenv("imageDB") + "/getImageUsers")
    except Exception:
        return jsonify({"response": imgDBFail}), 400

    users = imgs.json()["response"]
    keep = []
    c = 0
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
                    
            score = (average/divBy) * 100
            store[jCount][1] = "{:.2f}".format(score)
            jCount += 1

        
        iCount += 1
        divBy = 0
        average = 0
        score = 0

    contain = []
    for i in store:
        try:
            user = requests.get(os.getenv("authentication") + "/getUserByID", json = {"id": i[0]})
        except Exception:
            return jsonify({"response": authFail}), 400
        
        if(user.status_code != 400):
            thisUser = user.json()["response"]
            if(thisUser != None):
                try:
                    response = requests.get("https://isitarealemail.com/api/email/validate", params = {'email': thisUser['email']}, headers = {'Authorization': "Bearer " + os.getenv('email_api_key')})
                except Exception:
                    continue

                valid = response.json()['status']
                if(valid == "valid"):
                    try:
                        send = requests.post(os.getenv("send_email") + "/send-email", json = {"email": thisUser["email"], "score": round(float(i[1]), 2), "username": thisUser["username"]})
                        contain.append(send.json()["response"])
                    except Exception:
                        return jsonify({"response": "Connection to email service failed"}), 400

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
    image = request.json["image"]
    eval = 0
    if(request.json["style"].lower() == "hiragana"):
        try:
            eval = requests.post(os.getenv("hiragana") + "/hiragana", json = {"image": image})
        except Exception:
            return jsonify({"response": fail}), 400
        
    elif(request.json["style"].lower() == "katakana"):
        try:
            eval = requests.post(os.getenv("katakana") + "/katakana", json = {"image": image})
        except Exception:
            return jsonify({"response": fail}), 400
        
    else:
        try:
            eval = requests.post(os.getenv("kanji") + "/kanji", json = {"image": image})
        except Exception:
            return jsonify({"response": fail}), 400

    if eval.status_code == 200:
        score = eval.json()["score"]
        strokes = eval.json()["strokes"]
        if score == 0:
            return jsonify({'response': "image evaluation Failed."}), 401
        else:
            return jsonify({'response': "image upload successful", 'data': {'strokes': strokes,'score': score}}), 200
    else:
        return eval.json()


"""
    callEditUserPrivileges function:
        calls editUserPrivileges frunction from admin.py
    requset body:
        id: user's id
        admin: the new admin privilege
    return:
        json response
"""
@app.route('/admin/edit', methods = ['POST'])
@token_required
def callEditUserPrivileges():
    try:
        id = request.json['id']
        admin = request.json['admin']
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        return requests.post(os.getenv("authentication") + "/admin/edit", headers = headers, json = {"id": id, "admin": admin}).json()
    except Exception:
        return jsonify({"response": authFail}), 401

"""
    callEditUserPrivileges function:
        calls editUserPrivileges frunction from admin.py
    requset body:
        id: user's id
        admin: the new admin privilege
    return:
        json response
"""
@app.route('/admin/models', methods = ['GET'])
@token_required
def callListModelData():
    try:
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        return requests.get(os.getenv("authentication") + "/admin/models", headers = headers).json()
    except Exception:
        return jsonify({"response": authFail}), 401
        
"""
    callViewModel function:
        calls viewModel frunction from admin.py
    requset body:
        version: the version of the model
    return:
        json response
"""
@app.route('/admin/view-model', methods = ['POST'])
@token_required
def callViewModel():
    try:
        version = request.json['version']
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        return requests.post(os.getenv("authentication") + "/admin/view-model", headers = headers, json = {"version": version}).json()
    except Exception:
        return jsonify({"response": authFail}), 401
        
"""
    ListUsers function:
        calls event_bus.py listUsers function
    request body:
        admin's id
    return:
        json response with all users
"""
@app.route('/admin/view-users', methods=['POST'])
@token_required
def callListUsers():
    try:
        id = request.json['id']
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        return requests.post(os.getenv("authentication") + "/admin/users", headers = headers, json = {"id": id}).json()
    except Exception:
        return jsonify({"response": authFail}), 401
        
"""
    getAnalytics function:
        calls event_bus.py getAnalytics function
    request body:
        admin's id
    return:
        json response with all user analytics
"""
@app.route('/admin/analytics', methods=['GET'])
@token_required
def callGetAnalytics():
    try:
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        data = requests.get(os.getenv("imageDB") + "/getUserAnalytics", headers = headers)
        return data.json()
    except Exception:
        return jsonify({"response": imgDBFail}), 400

@app.route('/admin/getFrequency', methods=["GET"])
@token_required
def callGetFrequency():
    try:
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        return requests.get(os.getenv("imageDB") + "/getFrequency", headers = headers).json()
    except Exception:
        return jsonify({"response": imgDBFail}), 400
        
"""
    callObjectDetection function:
        calls the object detection which detects objects in image
    request body: 
        image
    return:
        json response
"""
@app.route('/object-detection', methods = ['POST'])
@token_required
def callObjectDetection():
    try:
        image = request.json["image"]
        headers = {'content-type': 'application/json', 'user-token': request.headers['user-token']}
        data = requests.post(os.getenv("detect") + '/detect', headers = headers, json = {"image": image})
        return data.json()
    except Exception:
        return jsonify({"response": "Connection to object detection service failed"}), 400

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
    app.run(port=int(os.environ.get("PORT", 8080)),host='0.0.0.0',debug=True)