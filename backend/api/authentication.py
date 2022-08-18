from getpass import getuser
import hashlib
import uuid
from evaluator import Evaluator
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

        Register
        Takes in a post or get request and adds the user to the database

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

    def login(self, email, password):
        salt = self.db.fetchSalt(email)
        if(salt == None):
            return None
        else:
            new_password = hashlib.sha512((password + salt[0]).encode()).hexdigest()
            user = self.db.getUser(new_password, email)
            return user
       

