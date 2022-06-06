#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2
from torch import index_add

freq_a = 0
a_index =[]
freq_u = 0 
u_index = []
index_A = 0
index_U = 0 
pathA = ''
pathU = ''

def create_A_images(train_labels): 

    #get the freq of each letter 
    #create an array that holds the index where the letter is
    for i in train_labels:
        if train_labels[i] == 0:
            freq_a=freq_a+1
    
    a_index =[] * freq_a 
    for i in train_labels:
        if train_labels[i] == 0:
            a_index.append(i)
def createAdatasetpath():
    pathA = os.getcwd() + '/datasetA'

def  create_A_path(train_imgs): 
    for n in range (0,2):
        index_A = a_index[n]
        filename = "image"
        number = str(n)
        extention = ".jpeg"
        cv2.imwrite(os.path.join(pathA ,filename+number+extention),train_imgs[index_A])

def createUdatasetpath(): 
    pathU = os.getcwd() + '/datasetU'

def create_U_path(train_imgs):
    for n in range (0,2): 
        index_U = u_index[n]
        filename = "image"
        number = str(n)
        extention = ".jpeg"
        cv2.imwrite(os.path.join(pathU ,filename+number+extention),train_imgs[index_U])

def create_U_images(train_labels): 
    freq_u = 0 
    u_index = [] 
    for i in train_labels:
        if train_labels[i] == 0:
            freq_u=freq_u+1
    
    u_index =[] * freq_u 
    for i in train_labels:
        if train_labels[i] == 0:
            u_index.append(i)

def Main(): 
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

    createAdatasetpath()  
    createUdatasetpath()
    
    cv2.imread(pathA)
    os.mkdir(pathA)
    cv2.imread(pathU)
    os.mkdir(pathU)
    #create_A_images()

