import os
from pickle import FALSE, TRUE
import psycopg2
from dotenv import load_dotenv
import hashlib
import uuid
from datetime import date

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
            self.conn2 = psycopg2.connect(host = os.getenv('Image_host'), database = os.getenv('Image_db'), user = os.getenv('Image_user'), password = os.getenv('Image_pass'))
            self.curr = self.conn.cursor()
            self.curr2 = self.conn2.cursor()
        except Exception as e:
            print("Could not connect to database", e)
            return None
    
    def findAll(self):
        query = "SELECT * FROM users;"
        self.curr.execute(query,)
        users = self.curr.fetchall()
        return users

    """
        getUserByEmail function:
            functionality: get user by theire eamil
        aguments: 
            email
        return:
            the username of the user with the given email
    """

    def getUserByEmail(self, email):
        query = " SELECT username FROM users WHERE email = %s"
        self.curr.execute(query, (email,))
        name = self.curr.fetchone()
        return name

    """
        getUserByID function:
            functionality: number of rows modified for bound checking
        aguments: 
            id
        return:
            the user with the given id
    """

    def getUserByID(self, id):
        query = " SELECT * FROM users WHERE userid = %s"
        self.curr.execute(query, (id,))
        user = self.curr.fetchone()
        return user

    """
        update password function:
            functionality: updates the password of the user
        aguments: 
            email
            password
        return:
            number of rows modified for bound checking
    """

    def updatePassword(self, token, password):
        update_query = "UPDATE users SET password = %s WHERE forgot_password_token = %s"
        try:
            print(token)
            self.curr.execute(update_query, (password, token))
            self.conn.commit()
            setTokenNull = "UPDATE users SET forgot_password_token = NULL WHERE forgot_password_token = %s"
            self.curr.execute(setTokenNull, (token,))
            self.conn.commit()
            return self.curr.rowcount    
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            return 0

#function used to add a user to the database
    def addUser(self, username, password, email, admin, passwordSalt, avgScore):
        q = "INSERT INTO users(email, admin, password, password_salt, username, average_score) VALUES(%s, %s, %s, %s, %s, %s);"
        self.curr.execute(q, (email, admin, password, passwordSalt, username, avgScore))
        self.conn.commit()

#function to find user with their email and return their username
    def getUser(self,password,email):
        q = "SELECT username , userid FROM users WHERE password = %s AND email = %s;"
        self.curr.execute(q, (password,email))
        user = self.curr.fetchone()
        print(user)
        return user
        
    def getAllUsers(self):
        q = "SELECT * FROM users;"
        self.curr.execute(q,)
        users = self.curr.fetchall()
        return users

    """
        save Image function:
            functionality: adds an image to the userImage table
        aguments: 
            image_path
            username
            image_char
        return:
            None
    """
    def saveImage(self, id, image_path, image_char, score, writing_style):
        upload_query = "INSERT INTO image(id, image_path, character, writing_style, score, upload_date) VALUES(%s, %s, %s, %s, %s, %s);"
        self.curr2.execute(upload_query, (id, image_path, image_char, writing_style, score, date.today()))
        self.conn2.commit()
        return True

    def deleteUser(self, email):
        query = "DELETE FROM users WHERE email = %s;"
        self.curr.execute(query, (email,))
        self.conn.commit()
 
    """
        getImage function:
            functionality: return images for the user
        aguments: 
            id
        return:
            None
    """
    def getImage(self, id):
        view_query = "SELECT * FROM image WHERE id=%s;"
        self.curr2.execute(view_query, ([id]))
        images_url = self.curr2.fetchall()
        return images_url

    """
        getImageUsers function:
            returns all users with id's in images database
        arguments:

        return:
            array of all entries in image database
    """
    def getImageUsers(self):
        getUsers = "SELECT * FROM image";
        self.curr2.execute(getUsers)
        users = self.curr2.fetchall()
        return users


    def getfeedback(self, user_id):
        query = "SELECT score FROM image WHERE id = %s;"
        self.curr2.execute(query, (user_id,))
        scores = self.curr2.fetchall()
        
        if(scores == None):
            return None
        
        return scores

    def addToken(self, email, token):
        try:
            query = "UPDATE users SET forgot_password_token = %s WHERE email = %s;"
            self.curr.execute(query, (token, email))
            self.conn.commit()
            return True
        except:
            return False

        