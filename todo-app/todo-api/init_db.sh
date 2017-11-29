#!/usr/bin/env bash

export MONGODB_URL=localhost:27017
docker container rm mongo
docker run -d -p 27017:27017 --name mongo --mount source=todo-app-data,target=/data/db --mount source=todo-app-config-data,target=/data/configdb mongo

gradle clean
gradle build
gradle bootRepackage

docker container stop mongo
docker container rm mongo
