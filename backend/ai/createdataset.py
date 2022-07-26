#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2
class createImages:
    freq_a = 0
    freq_a_test = 0
    a_index =[]
    a_index_test =[]
    freq_u = 0 
    freq_u_test = 0 
    u_index = []
    index_A = 0
    index_U = 0 
    
    pathA = os.getcwd() + '/datasetA'
    pathU = os.getcwd() + '/datasetU'
    pathA_test = os.getcwd() + '/datasetA_test'
    pathU_test = os.getcwd() + '/datasetU_test'
    
    """
        Function create_A_images:
        Creates images for the datasetA
        Description:
        Runs through the train images array and turns np array into a image
    returns:
      a folder named datasetA with the images
    """
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
    """
        Function create_A_images_test:
        Creates images for the datasetA_test
        Description:
        Runs through the test images array and turns np array into a image
    returns:
      a folder named datasetA_test with the images
    """
    def  create_A_images_test(self,test_imgs): 
        for i in test_labels:
            if test_labels[i] == 0:
                self.freq_a_test=self.freq_a_test+1
    
        a_index_test =[] * self.freq_a_test 
        for i in test_labels:
            if test_labels[i] == 0:
                a_index_test.append(i)
        index =0 
        for n in range (0,self.freq_a_test):
            index= a_index_test[n]
            filename = "image"
            number = str(n)
            extention = ".jpeg"
            cv2.imwrite(os.path.join(Dataset.pathA_test ,filename+number+extention),test_imgs[index])
    """
        Function create_U_images:
        Creates images for the datasetU and datasetU_test
        Description:
        Runs through the train images array and turns np array into a image
    returns:
      a folder named datasetU and datasetU_test with the images
    """

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
            if(n < self.freq_u -260):
                index= u_index[n]
                filename = "image"
                number = str(n)
                extention = ".jpeg"
                cv2.imwrite(os.path.join(Dataset.pathU ,filename+number+extention),train_imgs[index])
            else:
                index= u_index[n]
                filename = "image"
                number = str(n)
                extention = ".jpeg"
                cv2.imwrite(os.path.join(Dataset.pathU_test ,filename+number+extention),train_imgs[index])
    """
        Function main:
        loading npz file to become np array 
        makes np arrays
        create a dataset object
        create A training images and test images
        create U training and test images
        Description:
        creates the necessary folders and images for the dataset and loads them with images
    """
if __name__ == '__main__':
    
    
    input_path = os.path.join('.', 'input')

    
    k49_train_imgs_path = os.path.join(input_path, 'k49-train-imgs.npz')
    k49_train_labels_path = os.path.join(input_path, 'k49-train-labels.npz')
    k49_test_imgs_path = os.path.join(input_path, 'k49-test-imgs.npz')
    k49_test_labels_path = os.path.join(input_path, 'k49-test-labels.npz')

    
    train_imgs = np.load(k49_train_imgs_path)['arr_0']
    train_labels = np.load(k49_train_labels_path)['arr_0']
    test_imgs = np.load(k49_test_imgs_path)['arr_0']
    test_labels = np.load(k49_test_labels_path)['arr_0']
    
    Dataset = createImages()
    
    cv2.imread(Dataset.pathA)
    if os.path.exists(Dataset.pathA):
        pass
    else:
        os.mkdir(Dataset.pathA)
    
    Dataset.create_A_images(train_imgs)

    
    cv2.imread(Dataset.pathU)
    if os.path.exists(Dataset.pathU):
           pass
    else:
        os.mkdir(Dataset.pathU)
   
    cv2.imread(Dataset.pathU_test)
    
    if os.path.exists(Dataset.pathU_test):
           pass
    else:
        os.mkdir(Dataset.pathU_test)
    
    Dataset.create_U_images(train_imgs)
    
    cv2.imread(Dataset.pathA_test)
    if os.path.exists(Dataset.pathA_test):
       pass
    else:
        os.mkdir(Dataset.pathA_test)
    
    Dataset.create_A_images_test(test_imgs)