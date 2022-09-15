FROM python:3.9

ENV PYTHONBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY /backend ./

RUN pip install -r backend/requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 backend/api/app:app