from functools import partial
from authentication import Authentication

import sys
sys.path.insert(0, '../database')
sys.path.insert(1, '../email_user')

from database import Database
from image import Image

db = Database()
auth = Authentication(db)
img = Image(db)
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
    event_bus.append(partial(img.uploadImage, id, imagechar, image, file))
    event_number = len(event_bus) - 1
    return executeBus(event_number)