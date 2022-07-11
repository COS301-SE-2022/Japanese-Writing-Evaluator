import os
import numpy as np
import numpy as asarray
import pandas as pd

from PIL import Image
import cv2
class createImages:
    
    
  
    

    def  create_All_test_images(self,test_imgs,character_array): 
        length = len(character_array)
        for n in range (0,length):
            folder_name = '/dataset_' + character_array[n] + '_test'
            path = os.getcwd() + folder_name
            cv2.imread(path)
            if os.path.exists(path):
                pass
            else:
                os.mkdir(path)

            freq = 0
            character = []
            index = n 
            for i in test_labels: 
                if test_labels[i] == index:
                    freq = freq + 1
    
            character = [] * freq 
            for i in test_labels: 
                if test_labels[i] == index:
                    character.append(i)
    
            for j in range(0,freq):
                index = character[j]
                filename = "image"
                number = str(j)
                extention = ".jpeg"
                cv2.imwrite(os.path.join(path,filename+number+extention),test_imgs[index])

    def create_All_train_images(self,train_imgs,character_array): 
        length = len(character_array)
        for n in range (0,length):
            folder_name = '/dataset_' + character_array[n] + '_train'
            path = os.getcwd() + folder_name
            cv2.imread(path)
            if os.path.exists(path):
                pass
            else:
                os.mkdir(path)

            freq = 0
            character = []
            index = n 
            for i in train_labels: 
                if train_labels[i] == index:
                    freq = freq + 1
    
            character = [] * freq 
            for i in train_labels: 
                if train_labels[i] == index:
                    character.append(i)
    
            for j in range(0,freq):
                index = character[j]
                filename = "image"
                number = str(j)
                extention = ".jpeg"
                cv2.imwrite(os.path.join(path,filename+number+extention),train_imgs[index])

        
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
    test_imgs = np.load(k49_test_imgs_path)['arr_0']
    test_labels = np.load(k49_test_labels_path)['arr_0']
    character_array = []
    character_array = ['a','i', 'u', 'e', 'o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','wi' ,'we','n']
    #create a dataset object
    Dataset = createImages()
     #create A training images 

    Dataset.create_All_test_images(test_imgs,character_array)
    #Dataset.create_All_train_images(train_imgs,character_array)

