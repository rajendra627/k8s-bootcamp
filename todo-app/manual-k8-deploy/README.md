# Manually deploying the Todo-App to Kubernetes

In this section you will get a quick taste of all the manual steps needed to turn local application code into a an app running on a kubernetes cluster. this is not the most efficient or recommended way, but it is necessary if you need to gain deeper understanding into what tools such as Helm and Jenkins offer us when it comes to creating deployable apps and doing continuous delivery.


## Overview of tasks

#### 1. Build images from source code
#### 2. Tag images and push them into docker hub (using your own repo)
#### 3. Create Kubernetes Config Maps and Secrets for the Todo application
#### 4. Create The todo App on the cluster


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
> Open the file todo-app.yaml using your editor and ensure the following lines
```
image: architechbootcamp/todo-api:stable
&
image: architechbootcamp/todo-ui:stable
```
> replacing the _architechbootcamp_ docker hub id with your own docker hub id from the previous step this is important so Kubernetes knows where to go to pull the images


-----------------
Run the command

> kubectl create secret docker-registry acr-secret --docker-server=https://techdemoacr.azurecr.io --docker-username=acr_username --docker-password=acr_password --docker-email=anymail@company.com

Here is a description of what the script did

First we create the name space in the cluster (defaults to _todoapp_)
```bash
kubectl create namespace $todoapp_namespace
```
Then we create a few secrets based on the _secrets_ directory, you can see that in this directory we store secrets such as the azure ad identity of the app, only the Ops team has access to this secured secret directory

```bash
kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
```

The next line will create the configmap form the yaml file, you can check the yaml file to get an idea of the configuration environment variables passed to the application (such as log level and mongoDB url)

```bash
kubectl create --namespace=$todoapp_namespace -f todo-config.yaml
```

Finally we do install the application components using Deployments and Services declared in the todo-app.yaml

```bash
kubectl create --namespace=$todoapp_namespace -f todo-app.yaml
```

## Why this approach is not very practical

This approach makes installing the application in different environments, with different docker repositories and a very complex process, as you can see from the multiple commands we had to issue, on top of that any error will require almost a surgical approach to remove the created resources and changes to the configuration require environment settings etc.

This is where frameworks such as Helm comes to aid!

## Repo Helper files

All scripts here can help you achieve your previous tasks by changing the variable values in each script

| FileName        | Usage           |
| ------------- |:---------------------|
| cleanup.sh   | Removes every configuration, secret, app definition and removes the full namespace afterwards      |
| create-cluster.sh | A utility that will create a fresh cluster for you to experiment with as long as you modify the script with your own _**account_id**_ value , you can get that from Azure using the command _az account show_ and that will be the "id" field     |
