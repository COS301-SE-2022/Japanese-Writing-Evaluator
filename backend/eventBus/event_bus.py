from functools import partial

from flask import jsonify
from authentication import Authentication

import sys
sys.path.insert(0, '../database')
sys.path.insert(1, '../services')
from detect import detect
from send_email import Send_Email
import base64
import json
from database import Database
from image import Image
from hiragana import Hiragana
from kanji import Kanji
from Katakana import Katakana
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
def eventSendImage(id, image, file, writingStyle):
    image = image.partition(",")[2]
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(image))
    e = None
    if(writingStyle == "hiragana"):
        e = Hiragana()
    elif(writingStyle == "kanji"):
        e = Kanji()
    else:
        e = Katakana()          
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

"""
eventViewImages function:
    Calls all relevent functions to retrieve the users progress
parameters: 
    id
return:
    json response
"""
def eventViewImages(id):
    eventBus.append(partial(imagedb.getImages, id))
    eventNumber = len(eventBus) - 1
    images = executeBus(eventNumber)
    code = jsonify(images).status_code
    if(code == 200):
        eventBus.append(partial(Image.viewImages, img, images))
        eventNumber2 = len(eventBus) - 1
        return executeBus(eventNumber2)
    else:
        return jsonify({"response": "User image retrieval from database failed"}), 401

"""
eventSendToEvaluator function:
    Calls test character function which evaluates the users image
parameters: 
    image, imageChar
return:
    json response
"""
def eventSendToEvaluator(image, imageChar):
    obj = Evaluator(image, imageChar)
    eventBus.append(partial(obj.testCharacter, image, imageChar))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventSaveToDB function:
    Calls the save to DB function which saves the path to the users uploaded image in the database
parameters: 
    id, file, image, imageChar, score, writingStyle
return:
    json response
"""
def eventSaveToDB(id, file, imageChar, score, writingStyle):
    eventBus.append(partial(imagedb.saveToDB, id, file, imageChar, score, writingStyle))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventGetImageUsers function:
    Calls the get image users function which returns all entries inside image database
parameters: 
    none
return:
    array of all the entries inside image database
"""
def eventGetImageUsers():
    eventBus.append(partial(imagedb.getImageUsers))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventGetUser function:
    Calls the get user function 
parameters: 
    id
return:
    array of the specified users details
"""
def eventGetUser(id):
    eventBus.append(partial(auth.getUser, id))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventLogin function:
    Calls the login function
parameters: 
    email and password
return:
    username and userId 
"""
def eventLogin(email, password):
    eventBus.append(partial(auth.login, email, password))
    eventNumber = len(eventBus) -  1
    status = executeBus(eventNumber)
    print(status)
    if(status != None):
        return status
    else:
        return None

"""
eventGetCharacters function:
    Calls the get characters function
parameters: 
    none
return:
    all the characters in the cloud
"""
def eventGetCharacters():
    eventBus.append(partial(img.getCharacters))
    eventNumber =  len(eventBus) - 1
    return executeBus(eventNumber)

def eventListUsers(id):
    eventBus.append(partial(auth.listUsers, id))
    event_number = len(eventBus) - 1
    return executeBus(event_number)

def event_editUserPrivileges(id, ad):
    eventBus.append(partial(auth.editUserPrivileges, id, ad))
    event_number = len(eventBus) - 1
    status = executeBus(event_number)
    if(status != None):
        return status
    else:
        return None
    
def event_listModelData():
    eventBus.append(partial(auth.listModelData))
    event_number = len(eventBus) - 1
    status = executeBus(event_number)
    if(status != None):
        return status
    else:
        return None
   
def eventViewModelData(version):
    eventBus.append(partial(auth.viewModelData, version))
    event_number = len(eventBus) - 1
    status = executeBus(event_number)
    if(status != None):
        return status
    else:
        return None
     
"""
guest Upload Image function:
    uploads the given image to firebase and sends it to the evaluator
parameters: 
    image_char: the charector of the image
    image: the guest user image
return:
    json response
"""
def eventGuestUplaodImage(imagechar, image, style):
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

"""
eventObjectDetection function:
    calls the object detection function
parameters: 
    image: the users uploaded image
return:
    json response
"""
def eventObjectDetection(image):
    eventBus.append(partial(detect.detect, image))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)

"""
eventGetAnalytics function:
    calls the getUserAnalytics function
parameters: 
    id
return:
    json response
"""
def eventGetAnalytics():
    eventBus.append(partial(imagedb.getUserAnalytics))
    eventNumber = len(eventBus) - 1
    return executeBus(eventNumber)
