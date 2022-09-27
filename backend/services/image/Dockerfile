FROM python:3 as image

WORKDIR /usr/src/app

COPY ./image.py ./
COPY ./service.json ./

ENV PORT 5004
ENV HOST 0.0.0.

RUN pip install PyJWT flask pybase64 Pyrebase4 python-dotenv flask_cors

CMD [ "python", "image.py" ]