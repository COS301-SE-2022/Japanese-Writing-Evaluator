FROM python:3 as api_gateway

WORKDIR /usr/src/app

COPY ./backend/api/app.py ./

ENV PORT 8080
ENV HOST 0.0.0.0

RUN pip install pybase64 python-dotenv flask jwt flask_cors schedule requests

CMD [ "python", "app.py" ]


# FROM python:3 as auth

# WORKDIR /usr/src/app

# COPY ./backend/services/authentication.py ./

# ENV PORT 5005
# ENV HOST 0.0.0.0

# RUN pip install jwt hashlib ensurepip json uuid flask python-dotenv requests psycopg2-binary flask_cors

# CMD [ "python", "authentication.py" ]


# FROM python:3 as imgDB

# WORKDIR /usr/src/app

# COPY ./backend/services/imageDB.py ./

# ENV PORT 5003
# ENV HOST 0.0.0.0

# RUN pip install jwt json pyrebase flask flask_cors psycopg2-binary requests datetime python-dotenv 

# CMD [ "python", "imageDB.py" ]


# FROM python:3 as email

# WORKDIR /usr/src/app

# COPY ./backend/services/send_email.py ./

# ENV PORT 5002
# ENV HOST 0.0.0.0

# RUN pip install jwt json urllib sendgrid sendgrid.helpers.mail python-dotenv flask secrets flask_cors

# CMD [ "python", "send_email.py" ]


# FROM python:3 as image

# WORKDIR /usr/src/app

# COPY ./backend/services/image.py ./
# COPY ./backend/services/service.json ./

# ENV PORT 5004
# ENV HOST 0.0.0.

# RUN pip install jwt flask pybase64 pyrebase python-dotenv json flask_cors

# CMD [ "python", "image.py" ]


# FROM python:3 as detect

# WORKDIR /usr/src/app

# COPY ./backend/services/detect.py ./

# ENV PORT 5001
# ENV HOST 0.0.0.0

# RUN pip install matplotlib numpy opencv-python Pillow PyYAML pyyaml scipy torch torchvision tqdm tensorboard pandas seaborn ipython psutil thop

# CMD [ "python", "detect.py" ]


# FROM python:3 as evaluator

# WORKDIR /usr/src/app

# COPY ./backend/services/evaluator.py ./services/

# RUN pip install pillow tensorflow flask

# CMD [ "python", "services/evaluator.py" ]