FROM python:3.9

ENV PYTHONBUFFERED True

ENV app /backend
WOKDIR $app
COPY /backend ./

RUN pip install -r requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 api/app:app