FROM python:3.12-bullseye

ENV PYTHONBUFFERED=1

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


CMD gunicorn backend.wsgi:application --bind 0.0.0.0:8000

EXPOSE 8000