# Simple Notebook

A simple notebook. This is my Angular2 pet project.

Unfortunately, the docker-compose configuration isn't working, so, to try this app you have to:

1. build client side docker container
```
docker build -t simplenotebook_client client/
```

2. run client side docker container:
```
docker run --name snnginxc --publish 80:80 -P -d simplenotebook_client
```

3. build server side container:
```
docker build -t simplenotebook_server server/
```

4. run server side container:
```
docker run --name sngnunicorn -P -d simplenotebook_server
```

