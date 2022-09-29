# from flaskr import create_app
# import os

# def test_config():
#     assert not create_app().testing
#     assert create_app({'TESTING': True}).testing

# # def testlistusers(client):
# #     user = client.post("/admin/users", json = {"id": 1})
# #     assert user.status_code == 401
    
# # def testlistusers_invaild_user(client):
# #     user = client.post("/admin/users", json = {"id": 2})
# #     assert user.status_code == 401
    
# def test_edit(client):
#     edited = client.post("/admin/edit", json = {"id": 1, 'admin': 'f'})
#     assert edited.status_code == 401

# def test_edit_invalid_user(client):
#     edited = client.post("/admin/edit", json = {"id": 4, 'admin': 'f'})
#     assert edited.status_code == 401
        
# def test_models(client):
#     models = client.get('/admin/models')
#     assert models.status_code == 401
    
# def test_view_model(client):
#     model = client.post('/admin/view-model', json={'version': 'bate_model'})
#     assert model.status_code == 401
    
# def test_view_model_invalid_model(client):
#     model = client.post('/admin/view-model', json={'version': 'none'})
#     assert model.status_code == 401