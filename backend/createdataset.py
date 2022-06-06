#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2


def create_A_images(train_labels): 

    #get the freq of each letter 
    #create an array that holds the index where the letter is
    freq_a = 0
    freq_u = 0 
    a_index =[]
    u_index = [] 
    index = 0 
    for i in train_labels:
        if train_labels[i] == 0:
            freq_a=freq_a+1
    
    a_index =[] * freq_a 
    for i in train_labels:
        if train_labels[i] == 0:
            a_index.append(i)
            
def Main(): 
    # Paths
    input_path = os.path.join('.', 'input')
    classmap_path = os.path.join(input_path, 'k49_classmap.csv')

    # loading npz file to become np array 
    k49_train_imgs_path = os.path.join(input_path, 'k49-train-imgs.npz')
    k49_train_labels_path = os.path.join(input_path, 'k49-train-labels.npz')
    k49_test_imgs_path = os.path.join(input_path, 'k49-test-imgs.npz')
    k49_test_labels_path = os.path.join(input_path, 'k49-test-labels.npz')

    #making np array
    train_imgs = np.load(k49_train_imgs_path)['arr_0']
    train_labels = np.load(k49_train_labels_path)['arr_0']
    test_imgs = np.load(k49_test_imgs_path)['arr_0']
    test_labels = np.load(k49_test_labels_path)['arr_0']
 
    #create_A_images()
    #create_A_images(train_labels)