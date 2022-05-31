from flask import jsonify

class Image:
    def __init__(self):
        return
    """
        resetPassword function:
            calls update password to change the password
        request body: 
            email
            password
        return:
            json response
    """
    def uplaodImage(db, id, image_path, image_char, score):
        succ = db.saveImage(id, image_path, image_char, score)
        if succ:
            return jsonify({'response': "image upload successful."}), 200
        else:
            return jsonify({'response': "image upload failed."}), 401

    """
        viewImages function:
            calls get images to send the url to front-end 
        request body: 
            id: the user id
        return:
            json response
    """

    def viewImages(db, id):
        images = db.getImage(id)
        if images:
            return jsonify({'response': images}), 200
        else:
            return jsonify({'response': "view image failed."}), 401
