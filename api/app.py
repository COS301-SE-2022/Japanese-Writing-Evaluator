from flask import Flask, jsonify
from database import Database

app = Flask(__name__)
db = Database()

@app.route('/')
def main():
    try:
        users = db.findAll()
        return jsonify({'response': users}), 200
    except Exception as e:
        return jsonify({'response': str(e)}), 401
if __name__ == '__main__':
    main()
    