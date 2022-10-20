FROM python:3 as hiragana

WORKDIR /usr/src/app

COPY ./hiragana.py ./
COPY ./a_strokes.h5 ./
COPY ./hiragana_model.h5 ./
COPY ./imageToSave.png ./

ENV PORT 5007
ENV HOST 0.0.0.0

RUN apt-get update && apt-get -y install libgl1
RUN pip install tensorflow numpy opencv-python Flask python-dotenv Pillow Flask-Cors pybase64 PyJWT

CMD [ "python", "hiragana.py" ]