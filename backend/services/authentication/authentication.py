from functools import wraps
from wsgiref import validate
import jwt
import hashlib
import uuid
from flask import jsonify
import os
from dotenv import load_dotenv
import requests
import psycopg2
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:8080", "https://jwe-api-gateway-cplmvcuylq-uc.a.run.app"]}})

try:
    conn = psycopg2.connect(host = os.getenv('DB_HOST'), database = os.getenv('DB_NAME'), user = os.getenv('DB_USER'), password = os.getenv('DB_PASS'))
    curr = conn.cursor()
except Exception as e:
    print("Could not connect to database", e)

def token_required(function):
    @wraps(function)
    def decorated(*args, **kwargs):
        auth_token = None
        print(request.headers)
        if 'user-token' in request.headers:
            print("we have token")
            auth_token = request.headers['user-token']
        if not auth_token:
            return jsonify({'response' : 'Token is missing !!'}), 401
        try:
            data = jwt.decode(auth_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'response' : 'The token is invaild!'}), 401
        return  function(*args, **kwargs)

    return decorated
    
"""
    resetPassword function:
        calls update password to change the password
    request body: 
        email
        password
    return:
        json response
"""
@app.route("/reset-password", methods=["PUT"])
def resetPassword():
    token = request.json["token"]
    password = request.json["password"]
    salt = fetchSaltByToken(token)
    new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
    
    editedRow = updatePassword(token, new_password)
    if editedRow == 1:
        return jsonify({'response': "password reset successful."}), 200
    else:
        return jsonify({'response': "password reset failed."}), 401

def fetchSaltByToken(token):
    query = "SELECT password_salt FROM users WHERE forgot_password_token = %s;"
    curr.execute(query, (token,))
    salt = curr.fetchone()
    return salt

"""
    update password function:
        functionality: updates the password of the user
    aguments: 
        email
        password
    return:
        number of rows modified for bound checking
"""
def updatePassword(token, password):
    update_query = "UPDATE users SET password = %s WHERE forgot_password_token = %s"
    try:
        print(token)
        curr.execute(update_query, (password, token))
        conn.commit()
        setTokenNull = "UPDATE users SET forgot_password_token = NULL WHERE forgot_password_token = %s"
        curr.execute(setTokenNull, (token,))
        conn.commit()
        return curr.rowcount    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return 0

"""
    listUsers function:
        calls getAllUsers function
    parameters:
        None
    return:
        json response
"""
@app.route("/admin/users", methods = ['POST'])
@token_required
def listUsers():
    id = request.json['id']
    users = getAllUsers()
    response = [] 
    if(len(users) != 0):
        for user in users:
            if(user[0] == id):
                continue
            else:
                response.append({
                    "id": user[0],
                    "username": user[5],
                    "admin": user[2]
                })
        return jsonify({"response": response}), 200
    else:
        return jsonify({"response": "Database is empty"}), 401

"""
    findUser function:
        calls getUserByEmail function
    request body: 
        email
    return:
        json response
"""
@app.route("/findUser", methods=["GET"])
def findUser():
    email = request.json["email"]
    query = " SELECT username FROM users WHERE email = %s"
    curr.execute(query, (email,))
    name = curr.fetchone()
    if(name != None):
        try:
            send = requests.post(os.getenv("send_email") + "/forgot-password", json = {"email": email})
        except:
            return jsonify({"response": "Connection to email service failed"}), 400
        
        res = send.json()
        token = addToken(email, res["token"])
        if(token == False):
            return jsonify({'response': "Forgot password token unsuccessfully set"}), 401
        else:
            r = {"email": email, "token": res["token"]}
            return jsonify({"response": r}), 200

    else:
        return jsonify({"response": "user does not exist"}), 400

"""
    addToken function:
        calls addToken function
    request body: 
        email and token
    return:
        json response
"""
def addToken(email, token):
    try:
        query = "UPDATE users SET forgot_password_token = %s WHERE email = %s;"
        curr.execute(query, (token, email))
        conn.commit()
        return True
    except:
        return False

"""
    getUser function:
        calls getUserByID function
    request body: 
        id
    return:
        username and userid
"""
@app.route("/getUserByID", methods=["GET"])
def getUserByID():
    try:
        id = request.json["id"]
        query = "SELECT email, username FROM users WHERE userid = %s"
        curr.execute(query, (id,))
        user = curr.fetchone()
        if(user != None):
            res = {
                "email": user[0],
                "username": user[1]
            }
            return jsonify({"response": res}), 200
        else:
            return jsonify({"response": "user does not exist"}), 400 
    except Exception as e:
        return jsonify({"response": "user does not exist"}), 400

"""

    register function:
        registers a new user
    request body: 
        email, password and username
    return:
        json response
"""
@app.route("/register", methods=["POST"])
def register():
    try:
        email = request.json["email"]
        password = request.json["password"]
        username = request.json["username"]
        Finduser = getUserByEmail(email)
        print(findUser)
        if Finduser != None:
            res = "User already exists"
            return jsonify({"response": res}), 409
        else:
            try:
                verify_email = requests.get("https://isitarealemail.com/api/email/validate", params = {'email': email}, headers = {'Authorization': "Bearer " + os.getenv('email_api_key')})
            except:
                return jsonify({"response": "Email validation failed"}), 400
        
            if(verify_email.status_code == 200):
                salt = uuid.uuid4().hex
                passwordSalt = hashlib.sha512((password + salt).encode()).hexdigest()
                addUser(username, passwordSalt, email, False, salt, 0)
                res = "Registration Successful"
                return jsonify({'response': res}), 200
            else:
                return jsonify({"response": "invalid password"}), 401

    except Exception as e:
        return jsonify({'response': str(e)}), 401


def getUserByEmail(email):
    query = " SELECT username FROM users WHERE email = %s"
    curr.execute(query, (email,))
    name = curr.fetchone()
    return name

def addUser(username, password, email, admin, passwordSalt, avgScore):
    q = "INSERT INTO users(email, admin, password, password_salt, username, average_score) VALUES(%s, %s, %s, %s, %s, %s);"
    curr.execute(q, (email, admin, password, passwordSalt, username, avgScore))
    conn.commit()
"""

    login function:
        find a user based on their email and password
    request body: 
        email and password
    return:
        username and userId
"""
@app.route("/login", methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']
    salt = fetchSalt(email)
    if(salt == None):
        return None
    else:
        new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
        user = getUser(new_password, email)
        if(user != None):
            session['logged_in'] = True
            return jsonify({"response": {'username': user[0], 'id': user[1]}, "data": user}), 200 
        else:
            return jsonify({"response": "incorrect password"}), 401

def fetchSalt(email):
    query = "SELECT password_salt FROM users WHERE email = %s;"
    curr.execute(query, (email,))
    salt = curr.fetchone()
    return salt

def getUser(password,email):
    q = "SELECT username , userid, admin, super_admin FROM users WHERE password = %s AND email = %s;"
    curr.execute(q, (password,email))
    user = curr.fetchone()
    return user

"""
    edit user Privileges function:
        functionality: change the users admin privileges
    request body:
        id: user's id
        admin: the new admin privilege (boolean)
    return:
        json response
"""    
@app.route('/admin/edit', methods = ['POST'])
@token_required
def editUserPrivileges():
    edited = editUser(request.json['id'], request.json['admin'])
    print('edited: ', edited)
    if(edited):
        return jsonify({'response': 'Privileges updated successfully'}), 200
    else:
        print("Failed at admin")
        return jsonify({'response': 'Privileges update failed'}), 401
    
"""
    listModelData function:
        functionality: retrieves all model data
    arguments:
        None
    return:
        json response
"""    
@app.route("/admin/models", methods=["GET"]) 
@token_required
def listModelData():
    res = getModels()
    if res != None:
        data_Hiragana =  []
        data_kanji = []
        data_katakana =[]
        hiragana_strokes =  []
        katakana_strokes = []
        kanji_strokes =[]
        for model in res:
            if(model[2].lower() == 'hiragana'):
                data_Hiragana.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            elif(model[2].lower() == 'katakana'):
                data_kanji.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            elif(model[2].lower() == 'kanji'):
                data_katakana.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            elif(model[2].lower() == 'hiragana_strokes'):
                hiragana_strokes.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            elif(model[2].lower() == 'katakana_strokes'):
                katakana_strokes.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            elif(model[2].lower() == 'kanji_strokes'):
                kanji_strokes.append({
                    'version': model[1],
                    'data': model[3],
                    'accuracy': model[5],
                    'loss': model[4]
                })
            else:
                return jsonify({'response': 'data error!'}), 400
        data = []
        data.append({
            'hiragana':{
                'characterRecognition': data_Hiragana,
                'strokes': hiragana_strokes
            },
            'katakana':{
                'characterRecognition': data_katakana,
                'strokes': katakana_strokes
            },
            'kanji':{
                'characterRecognition': data_kanji,
                'strokes': kanji_strokes
            }
        })
                
        return jsonify({'response': 'successfully retrieved model data', 'data' :  data}), 200
    else:
        return jsonify({'response': 'Failed to get model data'}), 401
    
"""
    ViewModelData function:
        functionality: retrieves model data
    arguments:
        version : the version of the model
    return:
        json response
"""  
@app.route("/admin/view-model", methods=["POST"])  
@token_required
def viewModelData():
    try:
        resp = getAModel()
        print(resp)
        for i in resp:
            print(str(i[1]))
            if(str(i[1]) == request.json['version']):
                return jsonify({'response': 'successfully retrieved model data', 'data' : i}), 200
        return jsonify({'response': 'Failed to get model data'}), 401
    except Exception as e:
        print(e)
        return jsonify({'response': 'Failed to get model data'}), 401

"""
    getAModel function:
        queries the database for the a of the given version
    request body:
        version : the version of the model
    return:
        object
""" 
def getAModel():
    try:
        q = "SELECT * FROM models;"
        curr.execute(q,)
        model = curr.fetchall()
        return model
    except:
        return None
    
"""
    getModels function:
        queries the database for the a of the given version
    request body:
        version : the version of the model
    return:
        object
""" 
def getModels():
    try:
        q = "SELECT * From models;"
        curr.execute(q,)
        models = curr.fetchall()
        return models
    except:
        return None
    
"""
    editUser function:
        Edit the users admin status
    arguments:
        id, admin
    return:
        object
"""
def editUser( id, admin):
    try:
        query = "UPDATE users SET admin = %s WHERE userid = %s;";
        curr.execute(query, (admin, id))
        conn.commit()
        print("Edited")
        return True
    except Exception as e:
        print(e)
        return False  
    
"""
    getAllUsers function:
        functionality: gets all users database
    aguments: 
        none
    return:
        users
"""
def getAllUsers():
    q = "SELECT * FROM users;"
    curr.execute(q,)
    users = curr.fetchall()
    return users
    
if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 5005)),host='0.0.0.0',debug=False)