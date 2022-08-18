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
eventBus = []

"""
executeBus function:
    Executes the functions added to the even bus
parameters: 
    eventNumber of the current event that needs to be executed
return:
    json response of the function that was executed
"""
def executeBus(eventNumber):
    res = eventBus[eventNumber]()
    del eventBus[eventNumber]
    return res

"""
eventResetPassword function:
    Calls all relevent services to reset the user's password
parameters: 
    users email
return:
    json response
"""
def eventResetPassword(email):
    eventBus.append(partial(auth.findUser, email))
    eventNumber = len(eventBus) - 1
    response = executeBus(eventNumber)
    if(response[1] == 200): #returns a tuple, element at 1 is the status code
        emailRes = eventForgotPasswordEmail(email)
        tokenStore = eventStoreToken(email, emailRes["token"])
        if(tokenStore[1] != 200):
            return jsonify({'response': "Forgot password token unsuccessfully set"}), 401
        return emailRes
    else:
        return response
    
"""
eventStoreToken function:
    Calls all relevent services to store the users token for forgotten password
parameters: 
    users email and a generated token
return:
    json response
"""
def eventStoreToken(email, token):
    eventBus.append(partial(auth.addToken, email, token))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventForgotPasswordEmail function:
    Calls function that sends a forgotten password email to the user
parameters: 
    users email
return:
    json response
"""
def eventForgotPasswordEmail(email):
    eventBus.append(partial(Send_Email.forgotPasswordEmail, email))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventChangePassword function:
    Calls function that resets the users password
parameters: 
    new password and their token
return:
    json response
"""
def eventChangePassword(token, password):
    eventBus.append(partial(auth.resetPassword, token, password))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)
        
"""
eventRegister function:
    Calls the register function to register a new user
parameters: 
    email, password and username
return:
    json response
"""
def eventRegister(email, password, username):
    eventBus.append(partial(auth.register, email, password, username))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventUploadImage function:
    Calls the upload image function to upload a users image
parameters: 
    id, imagechar, image and file
return:
    json response
"""
def eventUploadImage(id, imagechar, image, file):
    eventBus.append(partial(Image.uploadImage, img, id, imagechar, image, file))
    eventNumber = len(eventBus) - 1
    return jsonify(executeBus(eventNumber))

"""
eventSendImage function:
    Calls all relevent functions to send an image to the cloud, add entry to database and evaluate it
parameters: 
    id, imagechar, image, file and writingStyle
return:
    json response
"""
def eventSendImage(id, imageChar, image, file, writingStyle):
    e = Evaluator(writingStyle, imageChar)
    feedback = e.testCharacter() # call AI
    score = feedback[1]
    if(score == 0):
        return jsonify({'response': "image evaluation failed."}), 401
    else:
        exitcode = eventUploadImage(id, imageChar, image, file)
        if(exitcode.status_code == 200):
            storeToDB = eventSaveToDB(id, file, imageChar, score, writingStyle)
            if(storeToDB == True):
                strokes = feedback[0]
                return jsonify({'response': "image upload successful", 'data': {'stroke1' : strokes[0], 'stroke2': strokes[1], 'stroke3': strokes[2],'score': score}}), 200
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
    uploads the given image to firebase and sends it to the evaluator
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
    feedback = e.testCharacter() # call AI
    score = feedback[1]
    if score == 0:
        return jsonify({'response': "image evaluation Failed."}), 401
    else:
        strokes = feedback[0]
        return jsonify({'response': "image upload successful", 'data': {'stroke1' : strokes[0], 'stroke2': strokes[1], 'stroke3': strokes[2],'score': score}}), 200
