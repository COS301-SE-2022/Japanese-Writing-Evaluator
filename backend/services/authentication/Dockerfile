FROM python:3 as auth

WORKDIR /usr/src/app

COPY ./authentication.py ./

ENV PORT 5005
ENV HOST 0.0.0.0

RUN pip install jwt ensurepip uuid flask python-dotenv requests psycopg2-binary flask_cors

CMD [ "python", "authentication.py" ]