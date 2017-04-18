#!/bin/bash

dropdb simplenotebook
dropuser simplenotebook

createdb simplenotebook
psql simplenotebook < northwind.sql

psql template1 -c "create user simplenotebook;"
psql template1 -c "alter user simplenotebook password 'mypassword';"
psql template1 -c "grant all on DATABASE simplenotebook to simplenotebook;"
psql simplenotebook -c "GRANT ALL on ALL tables IN SCHEMA public to simplenotebook"
