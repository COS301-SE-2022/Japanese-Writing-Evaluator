from functools import partial

from flask import jsonify
from authentication import Authentication

import sys
sys.path.insert(0, '../database')
sys.path.insert(1, '../email_user')

from database import Database
from image import Image
import evalutor
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

def event_resetPassword(email, password):
    event_bus.append(partial(auth.resetPassword, email, password))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_register(email, password, username):
    event_bus.append(partial(auth.register, email, password, username))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_uploadImage(id, imagechar, image, file):
    event_bus.append(partial(Image.uploadImage, img, id, imagechar, image, file))
    event_number = len(event_bus) - 1
    statusCode = jsonify(executeBus(event_number))
    return event_sendImage(id, imagechar, image, file, statusCode)

def event_sendImage(id, image_char, image, file, storageExitCode):
    if(storageExitCode.status_code == 200):
        score = event_sendToEvaluator(image_char)
        if(score == None):
            return jsonify({'response': "image evaluation failed."}), 401
        else:
            storeToDB = event_saveToDB(id, file, image_char, score)
            if(storeToDB == True):
                return jsonify({'response': "image upload successful, score: {}".format(score)}), 200
            else:
                return jsonify({'response': "Database storage failed"}), 401
    else:
        return jsonify({"response": "Storage to firebase failed"}), storageExitCode

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

def event_sendToEvaluator(image_char):
    event_bus.append(partial(evalutor.sendToEvaluator, image_char))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_saveToDB(id, file, image_char, score):
    event_bus.append(partial(imagedb.saveToDB, id, file, image_char, score))
    event_number = len(event_bus) - 1
    return executeBus(event_number)

def event_login(email, password):
    event_bus.append(partial(auth.login, email, password))
    event_number = len(event_bus) -  1
    return executeBus(event_number)

def event_getCharacters():
    event_bus.append(partial(img.getCharacters))
    event_number =  len(event_bus) - 1
    return executeBus(event_number)

def event_getuserFeedback():
    #TODO
    return

def event_guestUplaodImage(imagechar, image):
    event_bus.append(partial(evalutor.guestUploadImage, imagechar, image))
    event_number = len(event_bus)  - 1
    return executeBus(event_number)
