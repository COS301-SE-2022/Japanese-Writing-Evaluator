FROM python:3 as katakana

WORKDIR /usr/src/app

COPY ./katakana.py ./
COPY ./katakana.h5 ./
COPY ./imageToSave.png ./

ENV PORT 5009
ENV HOST 0.0.0.0

RUN apt-get update && apt-get -y install libgl1
RUN pip install tensorflow numpy opencv-python Flask python-dotenv Pillow Flask-Cors pybase64 PyJWT

CMD [ "python", "katakana.py" ]