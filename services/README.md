# Services #

Pods are ephemeral entities that will be dynamically scheduled by the scheduler.  Although they are assigned an IP, it cannot be relied upon to be stable.  Furthermore, you will often want multiple replicas of a given pod depending on your scaling needs.  So how are consumers of your pods to access them?  This is the problem that services are designed to solve.

Services abstracts away access to your pod(s).  A service receives a stable virtual IP, and routes requests to pods that it cares about.  It cares about those **pods that have labels that match the label selector defined in the service specification** - labels and label selectors play a big role in K8S and contributes to it highly dynamic nature.

* See [pod-details-service](./pod-details-service.yml) that shows a service that routes to 5 instances of a pod.

## Reference ##
- [Services docs at k8s.io](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Service Tutorial at k8s.io](https://kubernetes.io/docs/tasks/access-application-cluster/service-access-application-cluster/)