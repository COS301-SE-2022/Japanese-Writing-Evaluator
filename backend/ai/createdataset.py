#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2
class createTrainImages:
    freq_a = 0
    a_index =[]
    freq_u = 0 
    u_index = []
    index_A = 0
    index_U = 0 
    pathA = os.getcwd() + '/datasetA'
    pathU = os.getcwd() + '/datasetU'
    

    def  create_A_images(self,train_imgs): 
        for i in train_labels:
            if train_labels[i] == 0:
                self.freq_a=self.freq_a+1
    
        a_index =[] * self.freq_a 
        for i in train_labels:
            if train_labels[i] == 0:
                a_index.append(i)
        index =0 
        for n in range (0,self.freq_a):
            index= a_index[n]
            filename = "image"
            number = str(n)
            extention = ".jpeg"
            cv2.imwrite(os.path.join(Dataset.pathA ,filename+number+extention),train_imgs[index])



    def create_U_images(self,train_imgs):
        for i in train_labels:
            if train_labels[i] == 2:
                self.freq_u=self.freq_u+1
    
        u_index =[] * self.freq_u 
        for i in train_labels:
            if train_labels[i] == 2:
                u_index.append(i)
        index =0 
        for n in range (0,self.freq_u):
            index= u_index[n]
            filename = "image"
            number = str(n)
            extention = ".jpeg"
            cv2.imwrite(os.path.join(Dataset.pathU ,filename+number+extention),train_imgs[index])

if __name__ == '__main__':
    # Paths
    
    input_path = os.path.join('.', 'input')

    # loading npz file to become np array 
    k49_train_imgs_path = os.path.join(input_path, 'k49-train-imgs.npz')
    k49_train_labels_path = os.path.join(input_path, 'k49-train-labels.npz')
    k49_test_imgs_path = os.path.join(input_path, 'k49-test-imgs.npz')
    k49_test_labels_path = os.path.join(input_path, 'k49-test-labels.npz')

    #making np array
    train_imgs = np.load(k49_train_imgs_path)['arr_0']
    train_labels = np.load(k49_train_labels_path)['arr_0']
    #create a dataset object
    Dataset = createTrainImages()
    #create A training images 
    cv2.imread(Dataset.pathA)
    if os.path.exists(Dataset.pathA):
       pass
    else:
        os.mkdir(Dataset.pathA)
    
    Dataset.create_A_images(train_imgs)
    #create U training images 
    cv2.imread(Dataset.pathU)
    if os.path.exists(Dataset.pathA):
           pass
    else:
        os.mkdir(Dataset.pathA)
    
    Dataset.create_U_images(train_imgs) 