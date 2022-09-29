from flaskr import create_app
from dotenv import load_dotenv
import os

load_dotenv()

def test_config():
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing

# def test_saveToDB_pass(client):
#     headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
#     res = client.post("/saveToDB", headers = headers, json = {"id": 2, "style": "pytest_style", "score": 82, "imagechar": "pytest_char", "file": "pytest.png"})
#     assert res.status_code == 200

# def test_saveToDB_fail_missing_input_id(client):
#     headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
#     res = client.post("/saveToDB", headers = headers, json = {"id": "", "style": "pytest_style", "score": 82, "imagechar": "pytest_char", "file": "pytest.png"})
#     assert res.status_code == 400

def test_getImages_pass(client):
    headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
    res = client.post("/getImages", headers = headers, json = {"id": 2})
    assert res.status_code == 200

def test_getImages_no_images(client):
    headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
    res = client.post("/getImages", headers = headers, json = {"id": 52})
    assert res.status_code == 400

def test_getImageUsers_pass(client):
    headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
    res = client.get("/getImageUsers", headers = headers)
    assert res.status_code == 200

def test_getAnalytics_pass(client):
    headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
    res = client.get("/getUserAnalytics", headers = headers)
    assert res.status_code == 200

def test_getFrequency_pass(client):
    headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
    res = client.get("/getFrequency", headers = headers)
    assert res.status_code == 200