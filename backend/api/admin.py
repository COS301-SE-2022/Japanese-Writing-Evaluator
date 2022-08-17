import json
from flask import jsonify

class Admin:
    def __init__(self, db):
        self.db = db
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
        if(edited == True):
            return jsonify({'response': 'Privileges updated successfully'}), 200
        else:
            return jsonify({'response': 'Privileges updated failed'}), 401
