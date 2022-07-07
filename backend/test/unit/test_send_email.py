import sys
sys.path.insert(0, '../../email_user')
from send_email import Send_Email

"""
    Testing send email on success
"""
def test_send_email_success():
    send = Send_Email()
    user_email = "sechaba836@gmail.com"
    score = 75
    username = "Raymond"
    assert send.send_email(user_email, score, username) == "Email successfully sent"

"""
    Testing send email for failure
"""
def test_send_email_fail():
    send = Send_Email()
    user_email = "sechab"
    score = 50
    username = "Raymond"
    assert send.send_email(user_email, score, username) == "Failed"
