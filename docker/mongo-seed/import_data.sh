#!/usr/bin/env bash
echo 'inside import_data.sh'

#by default mongoimport will connect to localhost:27017
mongoimport --db todo-app --collection todos --type json --file todos.json --jsonArray
mongoimport --db todo-app --collection users --type json --file users.json --jsonArray
