FROM python:2.7.13-slim
MAINTAINER du2x <dudumonteiro@gmail.com>

RUN apt-get update && apt-get install -qq -y build-essential libpq-dev postgresql-client-9.4 --fix-missing --no-install-recommends

ENV INSTALL_PATH /simplenotebook
run mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY server/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

VOLUME ['client']

EXPOSE 8000

CMD gunicorn -b 0.0.0.0:8000 "server.app:app"
