from flaskr import create_app

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def test_progress(client):
    response = client.get('/progress').json()
    print(response)
    assert response.status_code == 200