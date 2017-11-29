FROM openjdk:8-jre-alpine

WORKDIR /app

COPY ./build/libs/*.jar todo-api.jar

ENV MONGODB_URL "mongodb:27017"

ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "todo-api.jar"]