# Manually deploying the Todo-App to Kubernetes

In this section you will get a quick taste of all the manual steps needed to turn local application code into a an app running on a Kubernetes cluster. this is not the most efficient or recommended way, but it is necessary if you need to gain deeper understanding into what tools such as Helm and Jenkins offer us when it comes to creating deployable apps and doing continuous delivery.

**Note: You can skip the first two steps and just use the image we have deployed to DockerHub.**

## Overview of tasks ##

1. Build images from source code
2. Tag images and push them into docker hub (using your own repo)
3. Create Kubernetes Config Maps and Secrets for the Todo application
4. Create the Todo App on the cluster

## Preparing your docker hub

First make sure you have a docker hub id _dockerhub-id_ or sign in to Dockerhub  to get one
https://hub.docker.com/

Please follow the documentation in the following links to create a repository and create two repositories _todo_api_ & _todo_ui_

https://docs.docker.com/docker-hub/repos/#viewing-repository-tags

You can run the following shell script that will build images, tags them and pushes them into your Dockerhub repositories

> ./build-push-images.sh _dockerhub-id_

When prompted with the password, enter your DockerHub password and the images will be pushed into your DockerHub and your dashboard will look like this in the web repositories

![Alt text](./readme-images/Docker_Hub.png?raw=true "Docker Hub Dashboard")


## Creating Kubernetes Config maps , Secrets and application deployment

**IMPORTANT** step first
> Open the file todo-app.yaml using your editor and update the following lines with your docker id and image tag from the previous step.

```yaml
image: architechbootcamp/todo-ui:latest
image: architechbootcamp/todo-api:latest
image: architechbootcamp/user-api:latest
```

```bash
#Create a namespace to deploy the application, we will use todo-app
kubectl create namespace todo-app

#Run the command
./deploy-todo-app.sh todo-app

#get the deployed services to get the external IP to the application
#for ACS or AKS, the -w flag stands for watch; as ACS/AKS will provision 
#a load-balancer, it can take some time for the external IP to be provided.
kubectl get services --namespace todo-app -w

#for minikube
minikube service list
```

Here is a description of what the script did.

First we create a few secrets based on the _secrets_ directory, you can see that in this directory we store secrets such as the azure ad identity of the app, only the Ops team has access to this secured secret directory

```bash
kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
```

The next line will create the configmap from the yaml file, you can check the yaml file to get an idea of the configuration environment variables passed to the application (such as log level and mongoDB url)

```bash
kubectl create --namespace=$todoapp_namespace -f todo-ui-config.yaml
kubectl create --namespace=$todoapp_namespace -f todo-api-config.yaml
kubectl create --namespace=$todoapp_namesapce -f user-api-config.yaml
```

Finally we do install the application components using Deployments and Services declared in the todo-app.yaml

```bash
kubectl create --namespace=$todoapp_namespace -f todo-app.yaml
```

## Why this approach is not very practical ##

This approach makes installing the application in different environments, with different docker repositories and a very complex process.  You have to execute multiple commands, many of them similar, there is configuration that is defined in different files but have the same values.  Hence, maintaining this deployment will be error prone and with more pods, services and deployments, the complexity will rapidly increase.

Tools such as Helm help manage this complexity.  See an example of deploying the same application using Helm in [../../helm/architech](../../helm/architech)

## Cleaning up ##

To blow everything away run:

```sh
kubectl delete namespace <namespace_name>
```

This will delete your namespace and all resources scoped to that namespace.
