FROM python:2.7.13-slim
MAINTAINER du2x <dudumonteiro@gmail.com>

RUN apt-get update && apt-get install -qq -y build-essential libpq-dev postgresql-client-9.4  npm nodejs nginx --fix-missing --no-install-recommends

RUN mkdir /src

COPY ./client /src

WORKDIR /src

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install -g npm3

RUN  npm3 install

COPY simplenotebook_client_nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

ENV PYTHONUNBUFFERED 1
ENV INSTALL_PATH /simplenotebook-server
run mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH
COPY server/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD gunicorn -b 0.0.0.0:5000 --reload --access-logfile - "server.app:app"
