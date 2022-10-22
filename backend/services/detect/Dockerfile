FROM python:3 as detect

WORKDIR /usr/src/app

COPY ./detect.py ./
COPY ./yolov5s.pt ./
COPY ./objectImage.jpeg ./

ENV PORT 5001
ENV HOST 0.0.0.0

RUN useradd -ms /bin/bash admin
RUN chown -R admin:admin ./
RUN chmod 755 ./
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN pip install googletrans==4.0.0rc1 pykakasi pybase64 PyJWT python-dotenv flask flask_cors matplotlib numpy opencv-python Pillow PyYAML pyyaml scipy torch torchvision tqdm tensorboard pandas seaborn ipython psutil thop
USER admin

CMD [ "python", "detect.py" ]