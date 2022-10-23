FROM python:3 as imgDB

WORKDIR /usr/src/app

COPY ./imageDB.py ./

ENV PORT 5003
ENV HOST 0.0.0.0

RUN pip install PyJWT Pyrebase4 flask flask_cors psycopg2-binary requests datetime python-dotenv 

CMD [ "python", "imageDB.py" ]