FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

RUN apt-get update && apt-get install -qq -y npm nodejs

RUN mkdir /src

COPY . /src

WORKDIR /src

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm install -g npm3

RUN  npm3 install

COPY simplenotebook_client_nginx.conf /etc/nginx/conf.d/default.conf
