# Ingress and Ingress Controllers #

In order to expose your service externally we know that we can use NodePort and LoadBalancer service types.  There is also another means, using a proxy that enable you to specify routing rules to your services.  The Ingress Controller serves as this proxy, and the Ingress are K8S resources that represent the routing rules.  Ingress and Ingress Controllers are very powerful as you can implement your own controllers and define dynamic routing rules.  For example, let's say you wish to implement A/B testing and you want 75% of the traffic to be routed to version A and the remainder to version B, you can do this via Ingress.

## Example ##

We will deploy two versions of our pod-details api and configure the routing to a specific version by path.

1. Create a namespace to deploy the example

```sh
kubectl create namespace ingress-example
```

2. Deploy the two versions of the pod-details services

```sh
kubectl create -f pod-details-service-v1.yml --namespace ingress-example
kubectl create -f pod-details-service-v2.yml --namespace ingress-example
```

3. Deploy the ingress controller and create an ingress rules

```sh
kubectl create -f ingress-controller.yml --namespace ingress-example
kubectl create -f ingress-rule-single-host.yml --namespace ingress-example
```

*Note:  The nginx ingress controller accesses the API Server to read resources.  Hence, it must be authorized to access the API Server.  

## Reference ##

* [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
* [Simplifying advanced networking with Ingress](http://blog.kubernetes.io/2016/03/Kubernetes-1.2-and-simplifying-advanced-networking-with-Ingress.html)
* [nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx)
* [nginx ingress controller examples](https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples)
* [nginx complete example](https://github.com/nginxinc/kubernetes-ingress/tree/master/examples/complete-example)
