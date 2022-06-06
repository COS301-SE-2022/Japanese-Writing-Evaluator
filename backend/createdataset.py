#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2



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