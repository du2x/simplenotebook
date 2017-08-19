# Simple Notebook

A simple sql notebook. This is my Angular4 pet project.

It uses 3 components:

1. a postgres database loaded with the classic northwind sample data.

2. a nginx serving an Angular4 client side app.

3. a gunicorn serving a Flask server side app.


Those components goes up with:

```
cd $LOCALREPO/sn-client
ng build
cd ..
docker-compose up --build
```

du2x
