import hashlib
from ensurepip import version
import json
import uuid
from flask import jsonify
import os
import requests
import psycopg2
from flask import Flask, jsonify, request, session, redirect
from flask_cors import CORS;

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app)

try:
    conn = psycopg2.connect(host = os.getenv('DB_HOST'), database = os.getenv('DB_NAME'), user = os.getenv('DB_USER'), password = os.getenv('DB_PASS'))
    curr = conn.cursor()
except Exception as e:
    print("Could not connect to database", e)

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
def listUsers(self, id):
    users = getAllUsers()
    response = []
    if(len(users) != 0):
        for user in users:
            if(user[0] == id):
                continue
            else:
                response.append({
                    "user_id": user[0],
                    "username": user[5],
                    "admin": user[2]
                })
        return jsonify({"response": response}), 200
    else:
        return jsonify({"response": "Database is empty"}), 200
    


"""
    findUser function:
        calls getUserByEmail function
    request body: 
        email
    return:
        json response
"""
@app.route("/findUser", methods=["POST"])
def findUser():
    email = request.json["email"]
    query = " SELECT username FROM users WHERE email = %s"
    curr.execute(query, (email,))
    name = curr.fetchone()
    if(name != None):
        send = requests.post("http://127.0.0.1:5002/forgot-password", json = {"email": email})
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
@app.route("/getUserByID", methods=["POST"])
def getUser():
    id = request.json["id"]
    query = " SELECT * FROM users WHERE userid = %s"
    curr.execute(query, (id,))
    user = curr.fetchone()
    res = {
        "email": user[1],
        "username": user[5]
    }
    return jsonify({"response": res}), 200

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
        if Finduser != None:
            res = "User already exists"
            return jsonify({"response": res}), 409
        else:
            salt = uuid.uuid4().hex
            passwordSalt = hashlib.sha512((password + salt).encode()).hexdigest()
            addUser(username, passwordSalt, email, False, salt, 0)
            res = "Registration Successful"
            return jsonify({'response': res}), 200

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
def login(self, email, password):
    salt = fetchSalt(email)
    if(salt == None):
        return None
    else:
        new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
        user = getUser(new_password, email)
        return user 

"""
    edit user Privileges function:
        functionality: change the users admin privileges
    arguments:
        id: user's id
        admin: the new admin privilege (boolean)
    return:
        json response
"""    
def editUserPrivileges(self, id, admin):
    edited = editUser(id, admin)
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
def listModelData(self):
    try:
        data = json.load(open('../ai/models_data.json'))
        return jsonify({'response': 'successfully retrieved model data', 'data' :  data}), 200
    except:
        return jsonify({'response': 'Failed to get model data'}), 401
    
"""
    ViewModelData function:
        functionality: retrieves model data
    arguments:
        version : the version of the model
    return:
        json response
"""    
def viewModelData(self, version, type, style):
    try:
        data = json.load(open('../ai/models_data.json'))
        arr = data['data'][style][type]
        resp = ""
        for a in arr:
            print(a['version'])
            if a['version'] == version:
                resp = a
                break
        print(resp)
        return jsonify({'response': 'successfully retrieved model data', 'data' : resp}), 200
    except Exception as e:
        print(e)
        return jsonify({'response': 'Failed to get model data'}), 401

if __name__ == '__main__':
    # run_simple('localhost', 5000, app, use_reloader=True, use_debugger=True, use_evalex=True)
    app.run(debug = True, port = 5005)