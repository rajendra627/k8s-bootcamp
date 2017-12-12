# Exercise 3 #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1/setup](./setup.md)

## Objective ##

In this exercise you are going to be deploy a pod and expose it as a service.

### Deploy a Pod and expose it as a LoadBalanced Service in ACS ###

* Create a docker image with contains simple HTTP service that returns a random number and today's date.  You can use any technology you wish.
* Deploy the container with 4 replicas
* Update the simple HTTP Service to return just a random number and do a rolling update
* Rollback the update and verify that you see a random numer and today's date
* Pull one of the pods from the replicaset by changing its label.  Confirm that the deployment creates a another replica.

### Deploy a Pod that access an external service ###

* Create a docker image that contains a service that integrates with the following stock quote API - https://api.iextrading.com/1.0/stock/aapl/quote.  You can use any technology you wish.
* Bonus: Implement your service so that you can pass any stock symbol as query string parameter.



