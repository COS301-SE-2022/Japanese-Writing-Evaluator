import json
from sendgrid import sendgrid
import os
from sendgrid.helpers.mail import *
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()

class Send_Email:

    def send_email(self, email, score, username):
        try:
            sg = sendgrid.SendGridAPIClient(api_key = os.getenv('SENDGRID_API_KEY'))
            from_email = Email(os.environ.get('SENDGRID_EMAIL'))
            to_email = To(email)
            subject = "Weekly Check-in from your favourite Japanese writing app"
            if(score <= 20):
              content = Content("text/html", "<h1 style='text-align: center'>Keep going {}!</h1><br><p>Don't worry, you will get the hang of it soon.</p><br><h4>Come back onto the app and continue learning more characters and styles!</h4>".format(username))
            elif(score > 20 and score <= 40):
              content = Content("text/html", "<h1 style='text-align: center'>Almost There {}!</h1><br><p>It's a steady climb, but we'll get to the top of the hill eventually</p><br><h4>Come back onto the app and continue learning more characters and styles!</h4>".format(username))
            elif(score > 40 and score <= 60):
              content = Content("text/html", "<h1 style='text-align: center'>Good Work {}!</h1><br><p>Your progress is starting to show, keep up the good work!</p><br><h4>Come back onto the app and continue learning more characters and styles!</h4>".format(username))
            elif(score > 60 and score <= 80):
              content = Content("text/html", "<h1 style='text-align: center'>Great Job {}!</h1><br><p>You have done exceptionally well this week, and I have to say, I didn't expect any less.</p><br><h4>Come back onto the app and continue learning more characters and styles!</h4>".format(username))
            else:
              content = Content("text/html", "<h1 style='text-align: center'>Outstanding {}!!!</h1><br><p>This week you have taken it to infinity and beyond. Keep reaching for the stars!</p><br><h4>Come back onto the app and continue learning more characters and styles!</h4>".format(username))

            mail = Mail(from_email, to_email, subject, content)
            response = sg.client.mail.send.post(request_body=mail.get())
            print(response.status_code)
            print(response.body)
            print(response.headers)

            res = "Email successfully sent"
            return jsonify({'response': res}), 200
        except Exception as e:
            return jsonify({'response': str(e)}), 401