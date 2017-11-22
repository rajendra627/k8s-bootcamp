#!/usr/bin/env bash

#by default mongoimport will connect to localhost:27017
mongoimport --db todo-app --collection todos --type json --file todos.json --jsonArray
mongoimport --db todo-app --collection users --type json --file users.json --jsonArray