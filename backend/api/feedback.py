from flask import jsonify
import psycopg2



class Feedback:
    def __init__(self, db):
        self.db = db
        return

    def getuserfeedback(self,db,user_id):
        score = db.getfeedback(user_id)
        if(score == None):
            return jsonify({'response': 'No feedback found.'}), 401

        return jsonify({'response': 'Get feedback successful','data': score}), 200

