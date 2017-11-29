# The Todo Microservice Application #

The Todo application is a simple microservice based application comprised of a ReactJS UI, a node Users API and the TodoItem API implemented in Kotlin (JVM).  For a database, mongodb is leveraged.

## Initial Set Up ##

This is only for initial set up which loads the MongoDB instance with test data. The data will be persisted across startup/shutdown as I use a named docker volume. 

1) start up mongodb:

``docker run -d -p 27017:27017 --name mongo --mount source=todo-app-data,target=/data/db mongo``

2) Build the todo-api.  This will also load the database with test data.

``./todo-api/gradle build``

3) Start the todo-api.

``./todo-api/gradle bootRun``

4) Open up Postman and send a request to http://localhost:8080/api/todos and you should see the list of todos returned.

To access the Swagger API docs go to http://localhost:8080/swagger-ui.html.

## After Initial Set Up ##

After initial setup, you can use docker-compose to start up the full application stack including UI, APIs and database with the following command.

``docker-compose up -d``  If you do not want to see the log messages printed to the consols.
``docker-compose up`` If you do want to see the log message printed to the console.

To shut down all the services including the database run the following command.

``docker-compose down``




