FROM python:3 as api_gateway

WORKDIR /usr/src/app

COPY ./app.py ./

ENV PORT 8080
ENV HOST 0.0.0.0

RUN pip install pybase64 python-dotenv flask PyJWT flask_cors schedule requests

CMD [ "python", "app.py" ]
