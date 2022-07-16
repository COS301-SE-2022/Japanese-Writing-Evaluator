from PIL import Image
from cnn import CNN
# import tensorflow as ft
# from tensorflow import keras
import numpy as np
# import matplotlib.pylot as plt

class Model():
    def __init__(self):
        self.modelObj = CNN()
        self.modelA = None
    
    def generate_model(self):
        self.modelA = self.modelObj.create_CNN()
        self.modelObj.getData('datasetU')
        self.modelA = self.modelObj.trian_model('modelU.h5')
        return self.modelA
         
if __name__ == '__main__':
    myModel = Model()
    model = myModel.generate_model()
    model.summary()
    
    # i = Image.open('image0.jpeg' )
    # img = i.resize((28,28))
    # gray_img = img.convert('L')
    # test_img = np.array([np.array(gray_img).flatten()],'f')
    # test_img = test_img.reshape(test_img.shape[0], 28, 28, 1)
    # # "C:\Users\Siphesihle\Desktop\school_work\hiregana\herigana_a.jpg"
    # model.predict(test_img)