# Extending Kubernetes #

Kubernetes is highly extensible, and it provides well-defined extension points. Not only can you swap out the core components with your own implementations, you can build on top of the existing components to add additional capabilities to your cluster.  The community is already leveraging these capabilities to build resuable components on top of Kubernetes.  For a good example, see [Operators](https://coreos.com/operators/). All extension points are covered [here](https://kubernetes.io/docs/concepts/overview/extending/), and we will cover the following three:

- [API Aggregation](#markdown-header-api-aggregation)
- [Custom Resource Definitions](#markdown-header-custom-resource-definitions)
- [Service Catalog](#markdown-service-catalog) 

The first two extension points enable you to extend K8S with new resource types and components that act on those resources types.  The types of resource types you can create is only limited by your imagination.  At a high-level, how the two approaches differ is on along the axes of simplicity and flexibility.  The CRD approach is simpler but less flexible, the Aggregated API approach is more complicated but more flexible.  See the differences [here](https://www.openservicebrokerapi.org/).  

Service Catalog enables you to expose external services, including provisioning and binding to those external services via the [Open Service Broker API](https://www.openservicebrokerapi.org/).   For example, let's say you want to provision and bind to the Azure CosmosDB database service in a declarative manner?  You can do so through Service Catalog.

## API Aggregation

The K8S aggregation layer enables you to add additional APIs on top of Kubernetes. To do so, you would create an API that would be aware of your custom resource, and register your API with the kube-apiserver via an [APIService](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.9/#apiservice-v1beta1-apiregistration) resource.  This resource enables you to claim a specific URL path in the K8S API.  The API implementation itself could be deployed as a pod onto the cluster, or even can be external to the cluster.  Essentially, the kube-apiserver acts as a proxy to your custom API but from the client's perspective, they are just interacting with the kube-apiserver.

For your APIs to be useful, it will need to integrate with the API server so that it can look for and update the K8S resources.  In order to help you with this, there is the [apiserver-builder](https://github.com/kubernetes-incubator/apiserver-builder/blob/master/README.md) incubator project that provide scaffolding to create your APIs. 

**Note, the K8S documentation states API Aggregration approach to adding custom resources requires implementing your api in golang.  This is actually not correct.  As the api can be deployed as a pod, it can be implemented in any language.**

See this [reference](https://github.com/kubernetes-incubator/apiserver-builder/blob/master/docs/concepts/aggregation.md) for an excellent overview of API Aggregation concepts.

### Running the Example ###

Check if apiextensions is enabled on your cluster.

```sh
kubectl get apiservice

#You should see something like this
NAME                                AGE
v1.                                 4d
v1.authentication.k8s.io            4d
v1.authorization.k8s.io             4d
v1.autoscaling                      4d
v1.batch                            4d
v1.networking.k8s.io                4d
v1.rbac.authorization.k8s.io        4d
v1.storage.k8s.io                   4d
v1beta1.apiextensions.k8s.io        4d  #apiextension.k8s.io group is enabled
v1beta1.apps                        4d
v1beta1.authentication.k8s.io       4d
v1beta1.authorization.k8s.io        4d
v1beta1.batch                       4d
v1beta1.certificates.k8s.io         4d
v1beta1.extensions                  4d
v1beta1.policy                      4d
v1beta1.rbac.authorization.k8s.io   4d
v1beta1.storage.k8s.io              4d
v1beta2.apps                        4d
v2beta1.autoscaling                 4d
```
If apiextensions is not enabled, then see [configure aggregation layer](https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer/).



## Custom Resource Definitions

Custom Resource Definitions is the simpler approach to introduce new resources to K8S.  The CRD resource specifies your custom resource in a declarative manner.  As of version 1.8, you specify a validation schema in your CRD and have the kube-apiserver validate instances of your resource that is submitted to by clients.  

**Note custom resource validation is alpha in v1.8 and needs to be [enabled](https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/)** 

## Service Catalog

## References

- [Aggregation Layer](https://kubernetes.io/docs/concepts/api-extension/apiserver-aggregation/)
- [Custom Resources](https://kubernetes.io/docs/concepts/api-extension/custom-resources/)
- [Azure Open Service Broker](https://azure.microsoft.com/en-us/blog/connect-your-applications-to-azure-with-open-service-broker-for-azure/)

