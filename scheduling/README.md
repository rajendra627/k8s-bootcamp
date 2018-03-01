# Advanced Scheduling #

In general, you won't care too much about how your pods are scheduled.  One of the values of K8S is that it abstracts away the nodes, and usually letting the scheduler schedule your pods as it sees fit is the way to go.  However, in certain scenarios, you will want more fine-grained control over how your pods are scheduled to the nodes.  For example, let's say that you want to separate the deployment of Elasticsearch pods from all other pods (this is because Elasticsearch is quite resource intensive and also requires fast disks for aggregation).  In this scenario, you will need to:

1. Pin the Elasticsearch pods to specific node.  Do this via nodeSelectors if you want to be very specific.  In this scenario we do.
2. Prevent other pods from being scheduled to the nodes that will be dedicated to the Elasticsearch pods.  Do this via taints and tolerations.

