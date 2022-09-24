import pytest
from flask import g, session 
from flaskr.db import get_db


def test_registration(client, app): 
    assert client.get('/auth/register').status_code == 200 
    response = client.post(
        '/auth/register', data={'username': 'a', 'password': 'a'}
    )
    assert 'http://localhost/auth/login' == response.headers['Location']

    with app.app_context():
        assert get_db().execute(
            "select * from user where username = 'a'",
        ).fetchone() is not None
