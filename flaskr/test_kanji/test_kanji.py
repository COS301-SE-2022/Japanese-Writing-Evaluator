from flaskr import create_app

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

def kanjiPredict(client):
    user = client.post("/kanji")
    assert user.status_code == 200