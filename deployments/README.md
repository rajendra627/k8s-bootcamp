# Deployments #

Deployments enable you to define the "desired state" of your pods.  The deployment controller then works behind the scenes to ensure the actual state meets the "desired state".  This is a key part of K8S that provides self-healing capabilities to your applications.  With Deployments you can do the following:

* Define the number of replicas of your pods
* Define the deployment strategy e.g RollingUpdate, Recreate
* Check deployment status
* Pause a deployment
* Rollback a deployment

A common question is what if you do not need replication?  You should still use deployments as you benefit from resilience, rollback, and [horizontal auto-scaling](./auto-scaling.md) capabilities.

Note, in previous versions of K8S, you interacted directly with ReplicationControllers and ReplicaSets to manage the replica count of your pods.  With Deployments, you no longer should deal directly with ReplicaSets, in fact, Deployments manages the ReplicaSets for you.

## References ##

- [Deployment docs at k8s.io](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
