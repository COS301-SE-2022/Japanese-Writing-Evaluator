import os
from pickle import FALSE, TRUE
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
            functionality: number of rows modified for bound checking
        aguments: 
            email
        return:
            the name of the user with the given email
    """

    def getUserByEmail(self, email):
        query = " SELECT username FROM users WHERE email = %s"
        self.curr.execute(query, (email,))
        name = self.curr.fetchone()
        return name

    """
        update password function:
            functionality: number of rows modified for bound checking
        aguments: 
            email
            password
        return:
            number of rows modified for bound checking
    """

    def updatePassword(self, email, password):
        update_query = "UPDATE users SET password = %s WHERE email = %s"
        try:
            self.curr.execute(update_query, (password, email))
            self.conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            return self.curr.rowcount

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
    def saveImage(self, id, image_path, image_char, score):
        upload_query = "INSERT INTO images(id, image_path, character, score) VALUES(%s, %s, %s, %s);"
        self.curr.execute(upload_query, (id, image_path, image_char, score))
        self.conn.commit()
        return True
 
    """
        getImage function:
            functionality: return images for the user
        aguments: 
            id
        return:
            None
    """
    def getImage(self, id):
        view_query = "SELECT image_path FROM images WHERE id=%s;"
        self.curr.execute(view_query, (id))
        images_url = self.curr.fetchall()
        return images_url