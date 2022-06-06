#imports 
import os
import numpy as np
import numpy as asarray
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import cv2


def createdataset():
    # Paths
    input_path = os.path.join('.', 'input')
    classmap_path = os.path.join(input_path, 'k49_classmap.csv')

    k49_train_imgs_path = os.path.join(input_path, 'k49-train-imgs.npz')
    k49_train_labels_path = os.path.join(input_path, 'k49-train-labels.npz')
    k49_test_imgs_path = os.path.join(input_path, 'k49-test-imgs.npz')
    k49_test_labels_path = os.path.join(input_path, 'k49-test-labels.npz')

    # Learning
    n_classes = 49
    learning_rate = 0.001
    image_shape = (28, 28, 1)
    n_epochs = 25

