FROM python:3 as kanji

WORKDIR /usr/src/app

COPY ./kanji.h5 ./
COPY ./imageToSave.png ./
COPY ./kanji.py ./

ENV PORT 5009
ENV HOST 0.0.0.0

RUN apt-get update && apt-get -y install libgl1
RUN pip install tensorflow numpy opencv-python Flask python-dotenv Pillow Flask-Cors pybase64 PyJWT

CMD [ "python", "kanji.py" ]