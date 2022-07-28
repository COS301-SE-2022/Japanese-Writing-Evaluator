from functools import partial
from urllib import response

from flask import jsonify
from authentication import Authentication

import sys
sys.path.insert(0, '../database')
sys.path.insert(1, '../email_user')
from send_email import Send_Email
import base64
import json
from database import Database
from image import Image
from evaluator import Evaluator
from imageDB import imageDB

db = Database()
auth = Authentication(db)
img = Image()
imagedb = imageDB(db)
event_bus = []

def executeBus(event_number):
    res = event_bus[event_number]()
    del event_bus[event_number]
    return res

def event_resetPassword(email):
    event_bus.append(partial(auth.findUser, email))
    event_number = len(event_bus) - 1
    response = executeBus(event_number)
    if(response[1] == 200): #returns a tuple, element at 1 is the status code
        email_res = event_forgotPasswordEmail(email)
        tokenStore = event_storeToken(email, email_res["token"])
        if(tokenStore[1] != 200):
            return jsonify({'response': "Forgot password token unsuccessfully set"}), 401
        return email_res
    else:
        return response
    
def event_storeToken(email, token):
    event_bus.append(partial(auth.addToken, email, token))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_forgotPasswordEmail(email):
    event_bus.append(partial(Send_Email.forgotPasswordEmail, email))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_changePassword(token, password):
    event_bus.append(partial(auth.resetPassword, token, password))
    event_number = len(event_bus) - 1
    return executeBus(event_number)
        

def event_register(email, password, username):
    event_bus.append(partial(auth.register, email, password, username))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_uploadImage(id, imagechar, image, file):
    event_bus.append(partial(Image.uploadImage, img, id, imagechar, image, file))
    event_number = len(event_bus) - 1
    return jsonify(executeBus(event_number))

def event_sendImage(id, image_char, image, file, writing_style):
    e = Evaluator(writing_style, image_char)
    score = e.testCharacter() # call AI
    print(score)
    if(score == None):
        return jsonify({'response': "image evaluation failed."}), 401
    else:
        exitcode = event_uploadImage(id, image_char, image, file)
        if(exitcode.status_code == 200):
            storeToDB = event_saveToDB(id, file, image_char, score, writing_style)
            if(storeToDB == True):
                return jsonify({'response': "image upload successful", 'score': score}), 200
            else:
                return jsonify({'response': "Database storage failed"}), 401
        else:
            return jsonify({'response': "Storage to cloud service failed"}), 401

def event_viewImages(id):
    event_bus.append(partial(imagedb.getImages, id))
    event_number = len(event_bus) - 1
    images = executeBus(event_number)
    code = jsonify(images).status_code
    if(code == 200):
        event_bus.append(partial(Image.viewImages, img, images))
        event_number2 = len(event_bus) - 1
        return executeBus(event_number2)
    else:
        return jsonify({"response": "User image retrieval from database failed"}), 401

def event_sendToEvaluator(image, image_char):
    obj = Evaluator(image, image_char)
    event_bus.append(partial(obj.testCharacter, image, image_char))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_saveToDB(id, file, image_char, score, writing_style):
    event_bus.append(partial(imagedb.saveToDB, id, file, image_char, score, writing_style))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_getImageUsers():
    event_bus.append(partial(imagedb.getImageUsers))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_getUser(id):
    event_bus.append(partial(imagedb.getUser, id))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_login(email, password):
    event_bus.append(partial(auth.login, email, password))
    event_number = len(event_bus) -  1
    status = executeBus(event_number)
    print(status)
    if(status != None):
        return status
    else:
        return None

def event_getCharacters():
    event_bus.append(partial(img.getCharacters))
    event_number =  len(event_bus) - 1
    return executeBus(event_number)

def event_getuserFeedback():
    #TODO
    return

"""
guest Upload Image function:
    uploads teh given image to firebase and sends it to the evaluator
parameters: 
    image_char: the charector of the image
    image: the guest user image
return:
    json response
"""
def event_guestUplaodImage(imagechar, image, style):
    image = image.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))
        
    e = Evaluator(style, imagechar)
    score = e.testCharacter() # call the AI
    print(score)
    if score == None:
        return jsonify({'response': "image evaluation Failed."}), 401
    else:
        return jsonify({'response': "image evaluation successful", 'score': score}), 200
