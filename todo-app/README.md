# The Todo Microservice Application #

The Todo application is a simple microservice based application comprised of a ReactJS UI, a node Users API and the TodoItem API implemented in Kotlin (JVM).  For a database, mongodb is leveraged.

## To start up the database and todo-api ##

The order of these tasks matter!!

1) start up mongodb:

``docker run -d -p 27017:27017 --name mongo --mount source=todo-app-data,target=/data/db mongo``

2) Build the todo-api.  This will also load the database with test data.

``./todo-api/gradle build``

3) Start the todo-api.

``./todo-api/gradle bootRun``

3) Open up Postman and send a request to http://localhost:8080/api/todos and you should see the list of todos returned.




