import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pickle import FALSE, TRUE
import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

class sendEmail:
    
    
    def __init__(self, email):
        self.ourEmail = os.getenv('OUR_EMAIL')
        self.password = os.getenv('EMAIL_PASS')
        self.recipient_email = email
        self.subject = "Reset Password."
    
    def send(self):
        message = f'Subject: {self.subject } \n\n Click the link to change your password.\n http:127.0.0.1:5000/password/reset'

        try:
            smtp = smtplib.SMTP('smtp.gamil.com', 587)
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()
            smtp.login(self.ourEmail, self.password)
            smtp.sendmail(self.ourEmail, self.recipient_email, message)
            smtp.close()
            return TRUE
        except Exception as e:
            print ("Failed: ",e)
            return FALSE

if __name__ == '__main__':
    sendObj = sendEmail("zamakweyama04@gmail.com")
    sendObj.send()