from backend.ai.cnn import CNN
import tensorflow as ft
from tensorflow import keras
import matplotlib.pylot as plt

class Model():
    def __init__(self):
        self.cnn = CNN()
    
    def generate_model(self):
        # trian the  model 
        self.modelA = self.cnn.create_CNN("")
        self.modelA = self.cnn.create_dataset(self, "", "")
        self.modelA = self.cnn.trian_model()
        
        # save model and serve model