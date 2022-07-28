import json
from urllib import response
from sendgrid import sendgrid
import os
from sendgrid.helpers.mail import *
from dotenv import load_dotenv
from flask import jsonify
from secrets import token_urlsafe

load_dotenv()

class Send_Email:

    def forgotPasswordEmail(email):
            sg = sendgrid.SendGridAPIClient(api_key = os.getenv('SENDGRID_API_KEY'))
            from_email = Email(os.environ.get('SENDGRID_EMAIL'))
            to_email = To(email)
            subject = "Forgot Password"
            site = "http://localhost:8100/forgot-password-email"
            rand = token_urlsafe(8)
            content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><p>Token Is: {}<br><br> This Token Expires After One Use <br> Click The Below Button To Reset Your Password.<br> Enter The Above Token In The Token Field <br><br><br> <a href={}><button> Reset Password </button></a> </p></div></body></html>'.format(rand, site))
            mail = Mail(from_email, to_email, subject, content)
            response = sg.client.mail.send.post(request_body=mail.get())
            if(response.status_code == 202):
                  send = {'response': "email successfully sent", 'token': rand}
                  return send
            else:
                  return jsonify({'response': "email unsuccessfully sent"}), 401

    def send_email(self, email, score, username):

        try:
            sg = sendgrid.SendGridAPIClient(api_key = os.getenv('SENDGRID_API_KEY'))
            from_email = Email(os.environ.get('SENDGRID_EMAIL'))
            to_email = To(email)
            subject = "Weekly Check-in from your favourite Japanese writing app"
            if(float(score) <= float(20)):
                  content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><h1 style="text-align: center;" "position: relative;">This week you scored: {}%</h1><h2 style="text-align: center">Keep going {}!</h2><br><p>Don\'t worry, you will get the hang of it soon.</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(round(score,2), username))                  
            elif(float(score) > float(20) and float(score) <= float(40)):
              content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><h1 style="text-align: center">This week you scored: {}%</h1><h2 style="text-align: center">Almost There {}!</h2><br><p>It\'s a steady climb, but we\'ll get to the top of the hill eventually</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(round(score,2), username))
            elif(float(score) > float(40) and float(score) <= float(60)):
              content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><h1 style="text-align: center">This week you scored: {}%</h1><h2 style="text-align: center">Good Work {}!</h2><br><p>Your progress is starting to show, keep up the good work!</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(round(score,2), username))
            elif(float(score) > float(60) and float(score) <= float(80)):
              content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><h1 style="text-align: center">This week you scored: {}%</h1><h2 style="text-align: center">Great Job {}!</h2><br><p>You have done exceptionally well this week, and I have to say, I didn\'t expect any less.</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(round(score,2), username))
            else:
              content = Content("text/html", '<!DOCTYPE html><html lang="en"><body style="height: 100%;width: 100%; background-color: #960722; background-repeat: no-repeat;font-family: sans-serif; color: white;text-align: center;"><div id="logo" style="height: 15%; width: 10%; margin-top: 2%; margin-left: 45%; position: absolute;"><img src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739" style="width: 100%; height: 100%;"></div><div id="textbody"><h1 style="text-align: center">This week you scored: {}%</h1><h2 style="text-align: center">Outstanding {}!!!</h2><br><p>This week you have taken it to infinity and beyond. Keep reaching for the stars!</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(round(score,2), username))
            mail = Mail(from_email, to_email, subject, content)
            response = sg.client.mail.send.post(request_body=mail.get())
            print(response.status_code)
            print(response.body)
            print(response.headers)

            return "Email successfully sent" 
        except Exception as e:
            return "Failed"