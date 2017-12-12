# Exercise 4 #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1/setup](./setup.md)

## Objective ##

In this exercise you are going to use Deployments to deploy multiple replicas of a Pod, expose it as a service, then do rolling deployment and rollbacks.

### Create a Deployment and perform rolling updates and rollbacks ###

* Create a docker image with contains simple HTTP service that returns a random number and today's date.  You can use any technology you wish.
* Deploy the container with 4 replicas
* Update the simple HTTP Service to return just a random number and do a rolling update
* Rollback the update and verify that you see a random numer and today's date
* Pull one of the pods from the replicaset by changing its label.  Confirm that the deployment creates a another replica.