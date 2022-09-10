from ensurepip import version
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
            functionality: retrieves all model data
        arguments:
            None
        return:
            json response
    """    
    def listModelData(self):
        try:
            data = json.load(open('../ai/models_data.json'))
            return jsonify({'response': 'successfully retrieved model data', 'data' : data}), 200
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
    def viewModelData(self, version):
        try:
            data = json.load(open('../ai/models_data.json'))
            arr = data['data']
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