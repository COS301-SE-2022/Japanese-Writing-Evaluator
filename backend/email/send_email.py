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
            if(int(score) <= 20):
              content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div><h1 style="text-align: center;" "position: relative;">This week you scored: {}</h1><h2 style="text-align: center">Keep going {}!</h2><br><p>Don\'t worry, you will get the hang of it soon.</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(score, username))
            elif(int(score) > 20 and int(score) <= 40):
              content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div><h1 style="text-align: center">This week you scored: {}</h1><h2 style="text-align: center">Almost There {}!</h2><br><p>It\'s a steady climb, but we\'ll get to the top of the hill eventually</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(score, username))
            elif(int(score) > 40 and int(score) <= 60):
              content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div><h1 style="text-align: center">This week you scored: {}</h1><h2 style="text-align: center">Good Work {}!</h2><br><p>Your progress is starting to show, keep up the good work!</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(score, username))
            elif(int(score) > 60 and int(score) <= 80):
              content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div><h1 style="text-align: center">This week you scored: {}</h1><h2 style="text-align: center">Great Job {}!</h2><br><p>You have done exceptionally well this week, and I have to say, I didn\'t expect any less.</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(score, username))
            else:
              content = Content("text/html", '<div align="center" style="color: rgb(210, 4, 45); background-size: 100% 100%; background-repeat: no-repeat; background-image: url(\'https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2Femail_Background.png?alt=media&token=f72405e1-5607-47b6-957c-81cda3c94af5\');"><div><td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:12% !important; width:12%; height:auto !important;" width="84" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://firebasestorage.googleapis.com/v0/b/bug-slayers-jwe.appspot.com/o/email%2FJWE-logos_black.png?alt=media&token=4f64c15a-a0b6-4fbb-8dda-be74e7a45739"></td></div><h1 style="text-align: center">This week you scored: {}</h1><h2 style="text-align: center">Outstanding {}!!!</h2><br><p>This week you have taken it to infinity and beyond. Keep reaching for the stars!</p><h4>Come back onto the app and continue learning more characters and styles!</h4></div>'.format(score, username))

            mail = Mail(from_email, to_email, subject, content)
            response = sg.client.mail.send.post(request_body=mail.get())
            print(response.status_code)
            print(response.body)
            print(response.headers)

            res = "Email successfully sent"
            return jsonify({'response': res}), 200
        except Exception as e:
            return jsonify({'response': str(e)}), 401