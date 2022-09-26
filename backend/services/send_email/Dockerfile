FROM python:3 as email

WORKDIR /usr/src/app

COPY ./send_email.py ./

ENV PORT 5002
ENV HOST 0.0.0.0

RUN pip install PyJWT sendgrid python-dotenv flask flask_cors

CMD [ "python", "send_email.py" ]