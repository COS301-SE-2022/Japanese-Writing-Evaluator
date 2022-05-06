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
#function used to add a user to the database
    def addUser(self, username, password, email):
        q = "INSERT INTO users(username, password,email) VALUES(%s, %s,%s);"
        self.curr.execute(q, (username, password))
        self.conn.commit()

#function to find user with their email and return their username
    def getUser(self,password,email):
        q = "SELECT username FROM users WHERE password = %s AND email = %s;"
        self.curr.execute(q, (password,email))
        user = self.curr.fetchone()
        return user
    
    # def findUser(self,password,email):
    #     q = "SELECT username FROM users WHERE password = %s AND email = %s;"
    #     self.curr.execute(q, (password,email))
    #     user = self.curr.fetchone()
    #     return username
    
    def getAllUsers(self):
        q = "SELECT * FROM users;"
        self.curr.execute(q,)
        users = self.curr.fetchall()
        return users