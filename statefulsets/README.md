# Statefulsets #

Statefulsets are similar to Deployments in that they enable you to define a pod template and specify the number of replicas from that pod.  They differ in that statefulsets provide capabilities that are beneficial for stateful applications that require:

* Unique Network Identities (one instance can be identified from another e.g. primary/standby)
* Ordering of deployment (one instance should be deployed before others)
* Ordering of termination (one instance should be terminated before others)

For example, certain databases, you need to access a specific node in the cluster and failover to a standby only when needed, hence, network identity is required.  In Kubernetes, the master node need to be up and available before the worker nodes can join the cluster, hence, ordering of deployment is required.

When you have such requirements, then statefulsets are the way to go.  If you do not have such requirements, then Deployments with Persistent Volumes may be all you need.

## References ##

- [Statefulsets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Stateful containerized applications with Kubernetes by Josh Berkus](https://opensource.com/article/17/2/stateful-applications)