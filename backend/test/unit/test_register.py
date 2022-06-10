# from flask import Flask, jsonify, request, json
# from backend.api.app import app, db
# import logging as log

# """
#     Testing registration with a POST AND GET request
# """
# def test_register():
#     response = app.test_client().post("/register", json = {
#         "email": "user@gmail.com",
#         "password": "user",
#         "username": "sechaba"
#     })

#     res = app.test_client().get("/register", json = {
#         "email": "user2@gmail.com",
#         "password": "user2",
#         "username": "Raymond"
#     })
    
#     data = json.loads(response.get_data(as_text=True))
#     resData = json.loads(res.get_data(as_text=True))

#     assert response.status_code == 200
#     assert response.request.path == "/register"
#     assert data['response'] == "Registration Successful"

#     assert res.status_code == 200
#     assert res.request.path == "/register"
#     assert resData['response'] == "Registration Successful"

#     db.deleteUser("user@gmail.com")
#     db.deleteUser("user2@gmail.com")


# """
#     Tetsing registering two users with the same email
# """
# def test_register_Same():
#     response = app.test_client().post("/register", json = {
#         "email": "testing@gmail.com",
#         "password": "user",
#         "username": "sechaba"
#     })

#     res = app.test_client().get("/register", json = {
#         "email": "testing@gmail.com",
#         "password": "password",
#         "username": "raymond"
#     })
    
#     data = json.loads(response.get_data(as_text=True))
#     resData = json.loads(res.get_data(as_text=True))

#     assert response.status_code == 200
#     assert response.request.path == "/register"
#     assert data['response'] == "Registration Successful"

#     assert res.status_code == 409
#     assert res.request.path == "/register"
#     assert resData['response'] == "User already exists"

#     db.deleteUser("testing@gmail.com")



    


