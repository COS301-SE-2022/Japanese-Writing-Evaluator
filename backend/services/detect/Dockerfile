FROM python:3 as detect

WORKDIR /usr/src/app

COPY ./detect.py ./
COPY ./yolov5s.pt ./
COPY ./objectImage.jpeg ./

ENV PORT 5001
ENV HOST 0.0.0.0

RUN pip install pykakasi pybase64 PyJWT python-dotenv flask flask_cors googletrans matplotlib numpy opencv-python Pillow PyYAML pyyaml scipy torch torchvision tqdm tensorboard pandas seaborn ipython psutil thop

CMD [ "python", "detect.py" ]