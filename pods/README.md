# Pods #

Pods are the primary unit of deployment, horizontal scaling and replication in K8S.  A pod is comprised of one or more containers.  The containers share storage and network. Therefore, a container can communicate with another container (in the same pod) via ``localhost:port``.  This does mean that the containers within a pod do need to be aware of which ports are being used, however, in reality that is desired as containers within pods are together because they logically (and physically) should be - they are naturally coupled.  In general, those things that should be close together should be encapsulated within a pod.  Those things that should be loosely coupled should be in separate pods.

The pod model makes K8S very flexible.  It makes it easy for you to containerize and move your exiting n-tiered, monolith apps to K8S easily without major architectural overhaul.  Overtime, as desired (and as it makes sense) you can decompose your application to a micro-service based architecture.

Pods are isolated from other pods from the perspective of network/storage/cpu.  In this manner they achieve the same level of isolation as containers.  In order to communicate with other pods, they do so through the K8S [service discovery](../services/README.md) abstraction. 

Pods are scheduled by K8S onto the worker nodes.  When you deploy a pod, the K8S scheduler will decide where that pod will be deployed.  The scheduler takes into account many factors when it makes this decision.  For example, 
* How much CPU, memory resources does your pod need?
* How much resources are available on the existing nodes?
* Does the pod state that it must be scheduled to a node with specific characteristics?
* Does the pod have QoS requirements when it comes to scheduling? e.g. Guaranteed, BestEffort

Pods are resources within K8S.  Their declarative specification (e.g. what containers are part of the pod, what ports should be open, how much memory/cpu is required, what volumes need to be mapped, QoS, etc) is sent to the kube-apiserver and durably stored in the cluster state store (e.g. etcd).  This specification is read by controller managers, the scheduler, and the kubelet agent to deploy the pod on to a node.  

Pods are specified in a pod manifest (in fact, all the K8S resources you will directly work with are specified in manifests).  These manifests are consumed by K8S to deploy and manage the lifecycle of your application.  You can view these manifests as the declarative specifiation of your system on K8S. If the specification changes, the K8S services deploys that change.  K8S essentially takes the "desired state" that you specify and makes it the "current state".  This is what makes K8S very, very powerful.

See the pod manifest for the [Todo-Api](./todo-api.yml).

## Reference ##

* [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
* [Pod API Reference](https://kubernetes.io/docs/api-reference/v1.8/#pod-v1-core)

