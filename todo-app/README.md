# The Todo Microservice Application #

The Todo application is a simple microservice based application comprised of a ReactJS UI, a node Users API and a Java TodoItem API.  For a database, mongodb is leveraged.

TODO: ADD Architecture diagram here.

We will use this application to learn about many of the core K8S concepts.

## Environment Set Up ##

Install docker for your OS.  The installation process differs depending on the OS.  In the end, you will need docker, docker-compose and docker-machine.  After installation verify that docker and docker-compose is on your PATH.

If you are using Windows 10, install the Linux sub-system so that you can run the shell scripts.  Make sure that you can run all the docker tools from the Bash shell.

## Initial Application Set Up ##

This is only for initial set up which loads the MongoDB instance with test data. The data will be persisted across startup/shutdown as I use a named docker volume. 

1) initialize the mongodb database.  This will start up mongodb container and initialize it with test data.  

```
cd todo-api-java
./init_db.sh
```

Run ``docker volume ls``.  You will see the following volumes:

```
todo-app-data
todo-app-config-data
```

See the [docker-compose.yml](docker-compose.yml) file to see how the volumes are defined.

2) In the todo-app directory, start up the application.

With logging to the console:

```
docker-compose up --build
```

Without logging to the console:

```
docker-compose up -d --build
```

The --build flag, rebuilds the image so that any new code changes are reflected.

To access the Swagger API docs go to http://localhost:8080/swagger-ui.html.

To shut down all the services including the database run the following command.

```
docker-compose down
```






