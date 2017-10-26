FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

#RUN apt-get update && apt-get install -qq -y npm nodejs
RUN apt-get update && apt-get install -qq -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install  -qq -y nodejs


RUN mkdir /src

COPY . /src

WORKDIR /src


RUN npm install -g npm3
COPY simplenotebook_client_nginx.conf /etc/nginx/conf.d/default.conf

RUN adduser node
RUN chown -R node /src
USER node

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install  @angular/cli

RUN npm3 install

USER root
RUN rm -rf /src/dist/*
RUN node_modules/@angular/cli/bin/ng build

