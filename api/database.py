import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
class Database:
    """
        Constructor:
            create a connect to the database
            returns None if connection fails
    """
    def __init__(self):
        try:
            self.conn = psycopg2.connect(host = os.getenv('DB_HOST'), database = os.getenv('DB_NAME'), user = os.getenv('DB_USER'), password = os.getenv('DB_PASS'))
            self.curr = self.conn.cursor()
            print("connected")
        except print(0):
            print("Could not connect to database")
            return None
    
    def findAll(self):
        q = "SELECT * FROM users;"
        self.curr.execute(q,)
        users = self.curr.fetchall()
        return users