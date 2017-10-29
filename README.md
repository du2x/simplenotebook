# Simple Notebook

A (very) simple sql notebook.

[screenshot]: screenshot.png  "Screenshot"
 
It uses 3 components:

1. a postgres database loaded with the classic northwind sample data.
2. a nginx serving an Angular4 client side app.
3. a gunicorn serving a Flask server side app.


Those components goes up with docker-compose.

```
docker-compose up
```

du2x
