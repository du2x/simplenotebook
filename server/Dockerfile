FROM python:2.7.13-slim
MAINTAINER du2x <dudumonteiro@gmail.com>

RUN apt-get update && apt-get install -qq -y build-essential libpq-dev postgresql-client-9.4 --fix-missing --no-install-recommends

ENV PYTHONUNBUFFERED 1
ENV INSTALL_PATH /simplenotebook
run mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH/client
CMD npm install

WORKDIR $INSTALL_PATH
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD gunicorn -b 0.0.0.0:5000 --reload --access-logfile - "app:app"
