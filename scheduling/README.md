# Advanced Scheduling #

In general, you won't care too much about how your pods are scheduled.  One of the values of K8S is that it abstracts away the nodes, and usually letting the scheduler schedule your pods as it sees fit is the way to go.  However, in certain scenarios, you will want more fine-grained control over how your pods are scheduled to the nodes.  For example, let's say that you want to separate the deployment of Elasticsearch pods from all other pods (this is because Elasticsearch is quite resource intensive and also requires fast disks for aggregation).  In this scenario, you will need to pin the Elasticsearch pods to nodes dedicated to ES, and also prevent other pods from being scheduled to those nodes. You can achieve this using taints and tolerations.

## Taints and Tolerations ##

Taints and tolerations work together.  Taints are applied to nodes, and they "repel" pods.  Tolerations are applied to pods, and they "tolerate" the taints and thus can still be scheduled to the nodes.  Therefore, only those pods that tolerate the taints will be scheduled to nodes with taints.

Taints are a key/value pair with an "effect".  Possible effects are:

* NoSchedule - Do not schedule pods unless they tolerate the taint.
* PreferNoSchedule - Soft version of 'NoSchedule'.  Pods can still be scheduled but only if there are no other nodes available.
* NoExecute - If the pod does not tolerate the taint, and is already scheduled to the node, it will be evicted and not be scheduled to the pod again.  

```sh
#here we are adding a taint to node1
#only pods that can tolerate this taint will be scheduled to this node
kubectl taint nodes node1 dedicated=elasticsearch:NoSchedule

#To remove this taint, note the minus
kubectl taint nodes node1 dedicated:NoSchedule-

#listing all taints applied to your nodes
#this use a Go template files to generate the output
kubectl get nodes -o go-template-file="./taints.tmpl"
```

Tolerations are added to the pod.spec.tolerations section of the manifest.  It is an array of objects so you an add mutiple tolerations.  Here is an example of a toleration that tolerates the taint above.

```sh
#this says tolerate taints where the value for the 
#key 'dedicated' is equal to 'nginx' AND effect is NoSchedule
spec:  
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "nginx"
    effect: "NoSchedule"
```

See [pods.yaml](./pods.yaml) for an example of using taints and tolerations.  See the comments in the file for instructions on how to deploy.

## Node Affinity/Anti-Affinity ##

## References ##

* [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)
* [Node Affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#node-affinity-beta-feature)
* [Well-Known Labels, Annotations and Taints](https://kubernetes.io/docs/reference/labels-annotations-taints/)

