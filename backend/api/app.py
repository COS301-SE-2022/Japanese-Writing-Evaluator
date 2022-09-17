from functools import wraps
import hashlib
# from dotenv import load_dotenv
from flask import Flask, jsonify, request, session, redirect
import jwt
import os
from flask_cors import CORS;
from schedule import every, repeat, run_pending
import requests
import sys
import psycopg2
import sendgrid
from sendgrid.helpers.mail import *
from secrets import token_urlsafe
sys.path.insert(0, '../services')
sys.path.insert(1, '../eventBus')
from send_email import Send_Email
import event_bus



# load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY']= os.getenv('SECRET_KEY')
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
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)

    return decorated

#####################################################
#login
try:
    conn = psycopg2.connect(host = os.getenv('DB_HOST'), database = os.getenv('DB_NAME'), user = os.getenv('DB_USER'), password = os.getenv('DB_PASS'))
    conn2 = psycopg2.connect(host = os.getenv('Image_host'), database = os.getenv('Image_db'), user = os.getenv('Image_user'), password = os.getenv('Image_pass'))
    curr = conn.cursor()
    curr2 = conn2.cursor()
except Exception as e:
    print("Could not connect to database", e)

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
    email = str(request.json["email"])
    password = str(request.json["password"])
    salt = fetchSalt(email)
    if(salt == None):
            return jsonify({'response': "user does not exist"})
    else:
        user_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
        user = getUser(user_password, email)

        if user == None:
            return jsonify({'response': "user not found."}), 401
        else:
            session["logged_in"] = True
            token = jwt.encode({
                'username' : user[0],
                'id': user[1],
            }, app.config['SECRET_KEY'], "HS256")
            return jsonify({'response': 'user login succesful', 'user-token':token, 'data': user}), 200


def fetchSalt(email):
    query = "SELECT password_salt FROM users WHERE email = %s;"
    curr.execute(query, (email,))
    salt = curr.fetchone()
    return salt

def getUser(password,email):
    q = "SELECT username , userid FROM users WHERE password = %s AND email = %s;"
    curr.execute(q, (password,email))
    user = curr.fetchone()
    return user

###################################################################

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
    # return event_bus.eventResetPassword(str(request.json["email"]))
    user = getUserByEmail(str(request.json["email"]))
    if(user != None):
        return forgotPasswordEmail(str(request.json["email"]))
    else:
        return jsonify({'response': "user does not exist"}), 401

def forgotPasswordEmail(email):
    sg = sendgrid.SendGridAPIClient(api_key = os.getenv('SENDGRID_API_KEY'))
    from_email = Email(os.environ.get('SENDGRID_EMAIL'))
    to_email = To(email)
    subject = "Forgot Password"
    site = "http://localhost:8100/forgot-password-password"
    rand = token_urlsafe(8)
    content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div> <p>Token is: {}<p> <br><a href="{}""><button> Reset Password </button></a></div>'.format(rand, site))
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    if(response.status_code == 202):
            send = {'response': "email successfully sent", 'token': rand}
            return send
    else:
            return jsonify({'response': "email unsuccessfully sent"}), 401


def getUserByEmail(self, email):
    query = " SELECT username FROM users WHERE email = %s"
    self.curr.execute(query, (email,))
    name = self.curr.fetchone()
    return name
    
@app.route('/forgot-password-password', methods = ['PUT'])
def resetPassword():
    return event_bus.eventChangePassword(str(request.json["token"]), str(request.json["password"]))

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
    return event_bus.eventRegister(str(request.json['email']), str(request.json['password']), str(request.json['username']))

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
    return event_bus.eventSendImage(int(request.json["id"]), str(request.json["imagechar"]), str(request.json["image"]), str(request.json["file"]), str(request.json["style"]))

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
    return event_bus.eventViewImages(int(request.json["id"]))

"""
    viewUsers function:
        calls event_bus.py listUsers function
    request body:
        none
    return:
        json response with all users
"""
@app.route('/viewUsers', methods=['GET'])
@token_required
def callListUsers():
    return event_bus.eventListUsers(int(request.json["id"]))

    
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
        return jsonify({"response": 'logged out'}), 200
    except:
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
    return event_bus.eventGetCharacters()

"""
    email function:
        calls send_email function which send emails to all users
    request body:

    return:

"""
@repeat(every().sunday)
def email_users():
    users = event_bus.eventGetImageUsers()
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

            score = (average/divBy) * 100
            store[jCount][1] = "{:.2f}".format(score)
            jCount += 1


        iCount += 1
        divBy = 0
        average = 0
        score = 0

    contain = []
    for i in store:
        thisUser = event_bus.eventGetUser(i[0])
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
    return event_bus.eventGuestUplaodImage(str(request.json["imagechar"]), str(request.json["image"]), str(request.json["style"]))

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
    return event_bus.event_editUserPrivileges(int(request.json['id']), str(request.json['admin']))

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
    return event_bus.event_listModelData()

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
    return event_bus.eventViewModelData(str(request.json['version']))

"""
    callObjectDetection function:
        calls the object detection which detects objects in image
    request body:
        image
    return:
        json response
"""
@app.route('/object-detection', methods = ['POST'])
# @token_required
def callObjectDetection():
    return event_bus.eventObjectDetection(str(request.json["image"]))


if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=int(os.environ.get("PORT", 8080)))
