# Exercise 1 #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1](./README.md)

## Objective ##

Deploy the Todo Application using helm. We will then do the following:

- list all deployments, services, pods
- Get details of the todo-api pod
- Get shell access to the todo-ui pod
- scale up then scale down the number of todo-api services
- deploy a different version of the todo-api service and do a rolling update

### Deploying the Todo Application ###

From within the helm directory run the following command:

```
#do a dry run install to make sure everything is ok
helm install --dry-run todo-app

#install the todo-app
helm install todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls
```

Open a browser and access the application at [http://host:8080](http://host:8080)

### List all deployments, services, pods ###

To list deployments:
```
kubectl get deployments
```

To list services:
```
kubectl get services
```

To list pods:
```
kubectl get pods

#How many pods are running?
```

### Get details of the todo-api pod ###

```
#replace <pod_name> with the name of your pod
kubectl describe pod/<pod_name>
```

### Get shell access to the todo-ui pod ###
```
#replace <todo-ui-pod-name> with the name of your pod
kubectl exec -it <todo-ui-pod-name> -- /bin/bash
```

### Scale up then scale down the number of Todo API services ###
```
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

```
#we are setting the container image for the todo-api container to todo-api:v2
#See spec.containers.image field of the deployment manifest
kubectl set image deployment/todo-api-deployment todo-api=todo-api:v2
```

In the second shell we are going to watch the status of the rollout.
```
kubectl rollout status deployment/todo-api-deployment
```

Now let's rollback!
```
kubectl rollout undeo deployment/todo-api-deployment

## Advanced ##

Deploy the istio service mesh using helm.  Verify the deployment succeeded then open up a proxy to the Grafana dashboard and access it using your browser.
See [deploying istio](../../helm/deploying-istio.md) for instructions.