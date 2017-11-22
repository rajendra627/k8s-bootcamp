FROM openjdk:8-jre-alpine

WORKDIR /app

COPY ../../todo-api/build/libs/todo-api-*-SNAPTSHOT.jar todo-api.jar
ENV SPRING_APPLICATION_JSON \
    'ADD EXTERNAL SPRING CONFIG HERE'

CMD ["/usr/bin/java", "-jar", "todo-api.jar"]