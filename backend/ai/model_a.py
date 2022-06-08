from tkinter import Image
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
        self.modelObj.getData('datasetA', 0)
        self.modelObj.getData('datasetA_test', 1)
        self.modelA = self.modelObj.trian_model('modelA')
        return self.modelA
         
if __name__ == '__main__':
    myModel = Model()
    model = myModel.generate_model()
    model.summary()
    test_img = np.array([np.array(Image.open(r"C:\Users\Siphesihle\Desktop\school_work\hiregana\herigana_a.jpg")).flatten()],'f')
    # "C:\Users\Siphesihle\Desktop\school_work\hiregana\herigana_a.jpg"
    model.predict(test_img)