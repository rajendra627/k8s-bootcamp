# Ingress and Ingress Controllers #

In order to expose your service externally we know that we can use NodePort and LoadBalancer service types.  There is also another means, using a proxy that enable you to specify routing rules to your services.  The Ingress Controller serves as this proxy, and the Ingress are K8S resources that represent the routing rules.  Ingress and Ingress Controllers are very powerful as you can implement your own controllers and define dynamic routing rules.  For example, let's say you wish to implement A/B testing and you want 75% of the traffic to be routed to version A and the remainder to version B, you can do this via Ingress.

## Reference ##

* [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
* [Simplifying advanced networking with Ingress](http://blog.kubernetes.io/2016/03/Kubernetes-1.2-and-simplifying-advanced-networking-with-Ingress.html)
* [nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx) 
