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
        print('edited: ', edited)
        if(edited):
            return jsonify({'response': 'Privileges updated successfully'}), 200
        else:
            print("Failed at admin")
            return jsonify({'response': 'Privileges update failed'}), 401
        
    """
        listModelData function:
            functionality: retrieves model data
        arguments:
            None
        return:
            json response
    """    
    def listModelData(self):
        try:
            data = json.load(open('../ai/models_data.json'))
            return jsonify({'response': 'successfully retrieved model data', 'data' : data['data']}), 200
        except:
            return jsonify({'response': 'Failed to get model data'}), 401