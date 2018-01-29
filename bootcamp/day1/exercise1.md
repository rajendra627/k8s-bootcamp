# Exercise 1 #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1/setup](./setup.md)

## Objective ##

*Note: We are going to cover some advanced topics right away.  We know we have not yet covered these topics but we want you to experience the workflow first then we will dive into the details*

Deploy the Todo Application using helm. We will then do the following:

* list all deployments, services, pods
* Get details of the todo-api pod
* Get shell access to the todo-ui pod
* scale up then scale down the number of todo-api services
* deploy a different version of the todo-api service and do a rolling update

### Deploying the Todo Application ###

From within the [helm directory](../../helm/) run the following command:

```sh
#1) create a namespace to deploy the application

kubectl create namespace todo-app

#2) create the secrets required by the application

./create_secrets.sh

#3) do a dry run install to make sure everything is ok
helm install --dry-run architech/todo-app

#4) install the todo-app
helm install architech/todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls
```

Open a browser and access the application at [http://host:8080](http://host:8080)

### List all deployments, services, pods ###

To list deployments:

```sh
kubectl get deployments
```

To list services:

```sh
kubectl get services
```

To list pods:

```sh
kubectl get pods

#How many pods are running?
```

### Get details of the todo-api pod ###

```sh
#replace <pod_name> with the name of your pod
kubectl describe pod/<pod_name>
```

### Get shell access to the todo-ui pod ###

```sh
#replace <todo-ui-pod-name> with the name of your pod
kubectl exec -it <todo-ui-pod-name> -- /bin/bash
```

### Scale up then scale down the number of Todo API services ###

```sh
#scale up to 5 replicas
kubectl scale --replicas=5 deployment/todo-api-deployment

#you should see 5 replicas
kubectl get deployment/todo-api-deployment

#scale down to 1 replica
kubectl scale --replicas=1 deployment/todo-api-deployment

#you should see 1 replica
kubectl get deployment/todo-api-deployment
```

### Update the Todo API and do a rolling update ###

Open up two shells.  In the first shell run the following command to update the image for the todo-api to a new version.:

```sh
#we are setting the container image for the todo-api container to todo-api:v2
#See spec.containers.image field of the deployment manifest
kubectl set image deployment/todo-api-deployment todo-api=todo-api:v2
```

In the second shell we are going to watch the status of the rollout.

```sh
kubectl rollout status deployment/todo-api-deployment
```

Now let's rollback!

```sh
kubectl rollout undo deployment/todo-api-deployment
```

### Next ... ###

[Exercise 2](./exercise2.md)

## Advanced ##

Deploy the istio service mesh using helm.  Verify the deployment succeeded then open up a proxy to the Grafana dashboard and access it using your browser.
See [deploying istio](../../helm/deploying-istio.md) for instructions.