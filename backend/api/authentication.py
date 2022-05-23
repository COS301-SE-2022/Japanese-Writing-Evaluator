import hashlib
import uuid
from flask import jsonify

class Authentication:
    def __init__(self):
        return
    """
        resetPassword function:
            calls update password to change the password
        request body: 
            email
            password
        return:
            json response
    """

    def resetPassword(db, email, password):
        editedRow = db.updatePassword(email, password)
        if editedRow == 1:
            return jsonify({'response': "password reset successful."}), 200
        else:
            return jsonify({'response': "password reset failed."}), 401

    """

        Register
        Takes in a post or get request and adds the user to the database

    """

    def register(db, email, password, username):
        try:
            Finduser = db.getUserByEmail(email)
            if Finduser != None:
                res = "User already exists"
                return jsonify({"response": res}), 409
            else:
                salt = uuid.uuid4().hex
                passwordSalt = hashlib.sha512((password + salt).encode()).hexdigest()
                db.addUser(username, passwordSalt, email, False, salt, 0)
                res = "Registration Successful"
                return jsonify({'response': res}), 200

        except Exception as e:
            return jsonify({'response': str(e)}), 401

    def login(db, email, password):
        return db.getUser(password, email)

