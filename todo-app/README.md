# The Todo Microservice Application #

The Todo application is a simple microservice based application comprised of a ReactJS UI, a node Users API and the TodoItem API implemented in Kotlin (JVM).  For a database, mongodb is leveraged.

## Environment Set Up ##

Install docker for your OS.  The installation process differs depending on the OS.  In the end, you will need docker, docker-compose and docker-machine.  After installation verify that docker and docker-compose is on your PATH.

## Initial Application Set Up ##

This is only for initial set up which loads the MongoDB instance with test data. The data will be persisted across startup/shutdown as I use a named docker volume. 

1) initialize the mongodb database.  This will start up mongodb container and initialize it with test data.  

```
cd todo-api
./init_db.sh
```

2) In the todo-app directory, start up the application.

With logging to the console:

```
docker-compose up
```

Without logging to the console:

```
docker-compose up -d
```

To access the Swagger API docs go to http://localhost:8080/swagger-ui.html.

To shut down all the services including the database run the following command.

```
docker-compose down
```






