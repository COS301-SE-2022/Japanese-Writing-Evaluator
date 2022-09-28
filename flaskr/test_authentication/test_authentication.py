from flaskr import create_app
import os

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def test_login(client):
    headers = {'Content-Type': 'application/json', 'user-token': os.getenv("token")}
    res = client.post("/login", json = {"email": "123@gmail.com", "password": "1" }, headers = headers)
    assert res.status_code == 200

def test_register(client):
    assert client.get('/register').status_code == 200
    response = client.post(
        '/register', data={'username': 'a', 'password': 'a'}
    )
    assert b'Login' in response.data

def test_find_user(client, app):
    assert client.get('/findUser').status_code == 200
    response = client.post(
        '/findUser', json={'email': '123@gmail.com'}
    )




def test_reset_password(client, auth):
    auth.login()
    assert client.get('/auth/reset_password').status_code == 200
    response = client.post(
        '/reset_password', data={'old_password': 'test', 'new_password': 'new'}
    )
    assert b'Password changed' in response.data

def test_get_user_id(client, auth):
    auth.login()
    with client:
        auth.logout()
        assert 'user_id'






