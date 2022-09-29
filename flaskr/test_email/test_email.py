from urllib import response
from flaskr import create_app

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def test_email_success(client):
    response = client.post('/send-email', json = {"email": "sechaba90@gmail.com", "score": 73, "username": "sechaba"})
    assert response.status_code == 200

def test_email_fail(client):
    response = client.post('/send-email', json = {"email": "ifhciwuhiu@gmail.com", "score": 73, "username": "sechaba"})
    assert response.status_code == 400

def test_email_no_at_symbol(client):
    response = client.post('/send-email', json = {"email": "ifhciwuhiu.com", "score": 73, "username": "sechaba"})
    assert response.status_code == 400

def test_forgot_password_email_success_fail(client):
    response = client.post('/forgot-password', json = {"email": "sechaba90@gmail.com"})
    assert response.status_code == 200

def test_forgot_password_fail(client):
    response = client.post('/forgot-password', json = {"email": "ifhciwuhiu@gmail.com"})
    assert response.status_code == 400

def test_forgot_password_email_no_at_symbol_fail(client):
    response = client.post('/forgot-password', json = {"email": "ifhciwuhiu.com"})
    assert response.status_code == 400