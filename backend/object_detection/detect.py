import base64
import torch

class detect:

    """
        detect function:
            loads yolo model and detects what's in the image
        parameter: 
            image
        return:
            the objects detected in the image
    """
    def detect(image):
        model = torch.hub.load('ultralytics/yolov5', 'yolov5x')

        img = ""
        image = img.partition(",")[2]

        with open("objectImage.jpeg", "wb") as fh:
            fh.write(base64.b64decode(image))

        im = "objectImage.jpeg"

        results = model(im)
        results.show()