# Packaging and deploying K8S applications using Helm #

## Pre-Requisites ##

You should have successfully set up your environment as outlined in [Day1](../bootcamp/day1/README.md)

## Deploying the Todo List Application ##

From within the helm directory run the following command:

```
#do a dry run install to make sure everything is ok
helm install --dry-run todo-app

#install the todo-app
helm install todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls
```

Open a browser and access the application.


## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/) 
