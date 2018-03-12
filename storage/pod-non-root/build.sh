#!/usr/bin/env bash

#required to statically compile all dependencies into a single binary
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main main.go

docker build --no-cache . -t architechbootcamp/simple-http-server:1.0.0
