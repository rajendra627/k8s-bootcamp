#!/usr/bin/env bash

mongoimport --host mongodb --db reach-engine --collection todos --type json --file todos.json --jsonArray
mongoimport --host mongodb --db reach-engine --collection users --type json --file users.json --jsonArray