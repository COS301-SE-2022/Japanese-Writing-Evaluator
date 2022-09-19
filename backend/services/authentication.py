import hashlib
from ensurepip import version
import json
import uuid
from flask import jsonify

class Authentication:
    def __init__(self, db):
        self.db = db

    """
        resetPassword function:
            calls update password to change the password
        request body: 
            email
            password
        return:
            json response
    """
    def resetPassword(self, token, password):
        salt = self.db.fetchSaltByToken(token)
        new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
        
        editedRow = self.db.updatePassword(token, new_password)
        if editedRow == 1:
            return jsonify({'response': "password reset successful."}), 200
        else:
            return jsonify({'response': "password reset failed."}), 401

    """
        listUsers function:
            calls getAllUsers function
        parameters:
            None
        return:
            json response
    """
    def listUsers(self, id):
        users = self.db.getAllUsers()
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

    def findUser(self, email):
        if(self.db.getUserByEmail(email)):
            return jsonify({'response': "user found"}), 200
        else:
            return jsonify({'response': "user does not exist"}), 401

    """
        getUser function:
            calls getUserByID function
        request body: 
            id
        return:
            username and userid
    """
    def getUser(self, id):
        return self.db.getUserByID(id)

    """
        addToken function:
            calls addToken function
        request body: 
            email and token
        return:
            json response
    """
    def addToken(self, email, token):
        if(self.db.addToken(email, token)):
            return jsonify({'response': "Token successfully added"}), 200
        else:
            return jsonify({'response': "Token unsuccessfully added"}), 401
    """

        register function:
            registers a new user
        request body: 
            email, password and username
        return:
            json response
    """
    def register(self, email, password, username):
        try:
            Finduser = self.db.getUserByEmail(email)
            if Finduser != None:
                res = "User already exists"
                return jsonify({"response": res}), 409
            else:
                salt = uuid.uuid4().hex
                passwordSalt = hashlib.sha512((password + salt).encode()).hexdigest()
                self.db.addUser(username, passwordSalt, email, False, salt, 0)
                res = "Registration Successful"
                return jsonify({'response': res}), 200

        except Exception as e:
            return jsonify({'response': str(e)}), 401


    """

        login function:
            find a user based on their email and password
        request body: 
            email and password
        return:
            username and userId
    """
    def login(self, email, password):
        salt = self.db.fetchSalt(email)
        if(salt == None):
            return None
        else:
            new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
            user = self.db.getUser(new_password, email)
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
        edited = self.db.editUser(id, admin)
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