# from flaskr import create_app
# from dotenv import load_dotenv
# import os

# load_dotenv()

# def test_config():
#     assert not create_app().testing
#     assert create_app({'TESTING': True}).testing

# def test_detect_fail(client):
#     headers = {'content-type': 'application/json', 'user-token': os.getenv("token")}
#     res = client.post('/detect', headers = headers, json = {'image': "image"})
#     assert res == 400