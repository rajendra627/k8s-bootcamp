# Kubernetes Fundamentals #

You should first take a look at the [Intro to Kubernetes on Azure Container Service](https://bitbucket.org/architech/k8s-training) if you have not already done so.  Here we will be taking a deeper dive into the key K8S resources and how to manage them.  We will be covering the following K8S resources:

- [Services](./services/README.md)
- [Deployments](./deployments/README.md)
- [Persistence](./persistence/README.md)
- [Secrets](./secrets/README.md)
- [ConfigMaps](./configmaps/README.md)
- [Statefulsets](./statefulsets/README.md)
- Jobs
- Daemonsets

To demonstrate the examples we will be deploying a simple To-Do list app.  The UI is implemented in React/Node, the API layer is implemented in Kotlin/Java9 and database will be MongoDB.  Below is an architecture diagram that shows how the solutio will be deployed into K8S.  

To run the examples, navigate into the resource directory (e.g. [Services](./services/README.md))