# DaemonSets #

With DaemonSets, K8S will deploy a single instance of your pod to EACH node - note, you can control which nodes the pods are scheduled to using nodeSelectors, affinity, taints/tolerances, however, always, a single pod will be deployed to a given node. When a new node is added to the cluster, K8S will ensure that a pod is deployed to that node also. When a node is removed from the cluster, K8S will ensure the pod is properly garbage collected.  Therefore, they are similar to deployments in that they provide a controlled means to deploy and shut down your pods across your cluster, with the exception that a single pod will be scheduled per node.  As with deployments you can leverage the ```kubectl rollout status|history|undo...``` commands to manage different revisions of a deployment.

Daemonsets are useful in those scenarios you need a daemon process to run on each node.  For example, a log aggregation daemon such as fluend or logstash.

## Reference ##

* [Kubernetes.io DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)