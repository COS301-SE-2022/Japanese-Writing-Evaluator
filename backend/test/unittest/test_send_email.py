import unittest

import sys
from unittest import mock
sys.path.insert(0, '../../email_user')
from send_email import Send_Email


class TestUtils(unittest.TestCase):
    """
        Testing send email on success
    """
    def test_send_email_success(self):
        send = Send_Email()
        user_email = "sechaba836@gmail.com"
        score = 50
        username = "Raymond"
        assert send.send_email(user_email, score, username) == "Email successfully sent"

    """
        Testing send email for failure
    """
    def test_send_email_fail(self):
        send = Send_Email()
        user_email = "sechab@randomemail.za"
        score = 50
        username = "Raymond"
        assert send.send_email(user_email, score, username) == "Failed"


if __name__ == '__main__':
    unittest.main()