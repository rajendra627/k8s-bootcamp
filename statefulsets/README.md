# Statefulsets #

Statefulsets are similar to Deployments in that they enable you to define a pod template and specify the number of replicas for that pod.  They differ in that statefulsets provide capabilities that are beneficial for stateful applications that require:

* Unique Network Identities (one instance can be identified from another e.g. primary/standby)
* Ordering of deployment (one instance should be deployed before others)
* Ordering of termination (one instance should be terminated before others)
* Unique persistence stores per pod in the statefulset

For example, certain databases, you need to access a specific node in the cluster and failover to a standby only when needed, hence, network identity is required.  In Kubernetes, the master node need to be up and available before the worker nodes can join the cluster, hence, ordering of deployment is required.

When you have such requirements, then statefulsets are the way to go.  If you do not have such requirements, then Deployments with Persistent Volumes may be all you need.

*Note: prior to 1.9 statefulsets are still Beta*

See the [Run Replicated Stateful Application](https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/) example from Kubernetes.io for an excellent example of deploying a MySQL master and two slaves as a statefulset.  The points to understand is the use of a headless service (a service with ClusterIP set to none), and the `volumeClaimTemplates` section of the manifest. Each pod in the statefulset will have a unique name based on an ordinal, likewise, each persistent volume claim will have a unique name based on an ordinal.  This ensures that each pod will have a different storage bound to the pod and this binding will remain the same even if the pod is rescheduled.

```sh
#to deploy the mysql statefulset example, run:
kubectl create --namespace mysql
kubectl create -f mysql-configmap.yaml --namespace mysql
#you must create the service first as the statefulset has a field called serviceName that must match
#the name of the headless service.
kubectl create -f mysql-services.yaml --namespace mysql
kubectl create -f mysql-statefulset.yaml --namespace mysql

#once you have created the statefulset run:
kubectl get pods --namespace mysql
```

## References ##

- [Statefulsets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Stateful containerized applications with Kubernetes by Josh Berkus](https://opensource.com/article/17/2/stateful-applications)