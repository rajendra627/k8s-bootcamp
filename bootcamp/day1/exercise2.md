# Exercise 2 #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1](./README.md)

## Objective ##

In this exercise you are going to be working with pods.

* Create and deploy pod that contains a single nginx container (use the public nginx image at dockerhub)
* Add resource requests and limits to the nginx pod
* Add QoS of BestEffort.  How does that change the manifest?
* Define liveness and readiness probes for the pod (Follow this [example](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/))
