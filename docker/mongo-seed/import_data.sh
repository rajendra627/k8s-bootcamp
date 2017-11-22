#!/usr/bin/env bash

mongoimport --db todo-app --collection todos --type json --file todos.json --jsonArray
mongoimport --db todo-app --collection users --type json --file users.json --jsonArray