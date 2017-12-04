# Kubernetes Bootcamp #

[Kubernetes (K8S)](https://kubernetes.io/docs/home/) is the industry standard for deploying, managing, operating container based distributed applications.  It is proven in the most demanding production environments in the world.  Internet scale companies such as Google, Netflix, EBay and many more depend on Kubernetes to quickly deploy applications and bring product to market faster.

In this bootcamp, we will cover all the essential concepts in Kubernetes. We will go through Kubernetes from the persective of two user personas.

- The Application Engineer that engineers the software solutions deployed to K8S.
- The Platform Engineer that provisions and operates the platform (including cloud services, K8S, CI/CD, databases, message queues, caches, authentication providers, etc) that the Application engineers depends on to bring product to market.

We will also actually deploy a microservice based [application](./todo-app) to K8S.  Using this reference application, we will learn K8S concepts in a more meaningful way - as if you were using K8S to deploy and manage a real application.  We will cover scenarios such as:

- Continuous Integration/Continuous Deployment 
- Blue/Green deployments
- Canary deployments
- Deploying multiple versions of your application to perform A/B testing
- Auto-scaling your application to deal with peak traffic demand
- Developing/testing/deploying your application - from your laptop to K8S - with focus on developer productivity
- RBAC (Role Based Access Control) to ensure Production environments are isolated from Dev/Test and QA.
- Many more.

By the end of this 2-day bootcamp, you will learn the following K8S concepts:

- [Pods - the unit of deployment on K8S](./pods/README.md) 
- [Services - how service discovery works in K8S](./services/README.md)
- [Deployments - doing rolling updates, rollbacks, scaling out](./deployments/README.md)
- [Persistence - managing durable state](./persistence/README.md)
- [Secrets - externalizing secrets and passwords](./secrets/README.md)
- [ConfigMaps - externalizing configuration from your applications](./configmaps/README.md)
- [Statefulsets - how to deploy stateful applications](./statefulsets/README.md)
- Jobs
- Daemonsets
- [Ingress and Ingress Controllers - key to controlling how requests originating from outside the cluster is routed to your services](./ingress/README.md)
- [RBAC - locking down your K8S environment](./rback/README.md)
- [Monitoring and log aggregation](/monitoring/README.md)
- [Helm - packaging and deploying your application to K8S](./helm/README.md)

### Day 1 Outline: ###
- [Setting up your environment](./day1/set-up.md)
- The Todo list microservices application overview
    - Deploying the application to K8S
    - Making a change and doing a rolling-update
    - Let's do some A/B testing!!
    - Scaling out the application to deal with increased traffic
- [Kubernetes Architecture](./day1/k8s-architecture.md)
    - Key components and what role they serve
    - Key K8S resources and their purpose
    - Quick overview of Kubernetes networking
    - K8S as a dynamic platform and what that means
- [Pods](./pods/README.md) - the unit of deployment in K8S
    - Defining the manifest
    - What to consider when decomposing your application into pods
    - Health checks and CPU, Memory requests and limits
- [Services](./services/README.md) - How do pods find each other?
    - Exposing your pods as services
    - Using load-balancers and NodePorts to expose your pods to clients outside your cluster
    - Services to access services external to your cluster
- [ReplicaSets](./replicasets/README.md) - How do you scale your services?
- [Deployments](./deployments/README.md) - Deployments enable you to perform rolling upgrades, rollback, and scale up/scale down your services.

### Day 2 Outline: ###
- [Persistence](./persistence/README.md) - Volumes, Persistence Volume Claims, Storage Classes.  
- [Statefulsets](./statefulsets/README.md) - Using statefulsets to deploy services that require long-lasting, durable state (e.g. databases)
- [Jobs]()
- [Daemonsets](./daemonsets/README.md) - Running pods that need to run on all or some nodes continuously e.g. for log aggregation.
- [Ingress](./ingress/README.md) - Customizing the routing your published services.
    - Deploying the nginx ingress controller
    - Configuring routing to different version of your services
- [RBAC - Role Based Access Control](./rbac/README.md) - Controlling access to your K8S cluster.
    - K8S authn/authr model
    - Roles and Role bindings
    - Integrating Azure AD for authn/authr
    - Creating custom roles and role bindings to only allow access to a specific namespace (e.g. qa or dev)
- [Monitoring and Log Aggregation](./) - Deploying EFK (Elasticsearch, Fluentd, Kibana) for log aggregation, Prometheus and Grafana for monitoring
- [Introduction to Helm](./helm/README.md) - Package manager for K8S deployments.
    - What is it and why you need it
    - Deploying the Todo list application using Helm
    - Charts and templates
    - Sharing your charts
- Other K8S tools and projects you should know about:
    - [Istio](https://istio.io/docs/) - A microservices service mesh that can be deployed to K8S.  Provides fine-grained service to service authn/authr, intelligent load-balancing (via ingress and ingress controllers), telemetry and more!
    - [kubetoken](https://github.com/atlassian/kubetoken) - a tool to simplify authentication with K8S via temporary certificates.
    - [Kompose](http://kompose.io/) - converts you docker compose yaml files to K8S manifests.  Very helpful if you start with docker compose.
    - [kubespray](https://github.com/kubernetes-incubator/kubespray) - Deploying K8S using ansible. Can be used to deploy on bare metal, on-premises VMs, various cloud providers.