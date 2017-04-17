FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

RUN apt-get update && apt-get install -qq -y npm nodejs

COPY . /src

RUN  bash -c "cd /src && npm cache clean && npm rebuild"

COPY simplenotebook_client_nginx.conf /etc/nginx/conf.d/default.conf
