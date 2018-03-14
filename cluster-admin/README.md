# Cluster Administration

Here we will cover some fundamental cluster administration considerations on Azure.  We will focus on Azure specific concerns and leave the more general overview to the [excellent docs](https://kubernetes.io/docs/tasks/) at K8S.io. 

- [Resource Quotas](#rq)
- [Limit Ranges](#lr)
- [Container Network Interface](#cni)
- [Upgrading the Cluster](#upgrading)
- [Backup And Disaster Recovery](#backup)

## <a id="rq"></a>Resource Quotas

## <a id="lr"></a>Limit Ranges

## <a id="cni"></a>Container Network Interface

## <a id="upgrading"></a>Upgrading the Cluster

The steps to upgrade your cluster depends on how it was deployed.  If you are on AKS, then the az cli has a command that will upgrade the cluster `az aks upgrade`.  Just provide the name of your current cluster, the K8S version to upgrade to.  Note, your cluster will be unavailable during an upgrade.

If you deployed using ACS Engine, then then you would upgrade using the command `acs-engine upgrade`.  See details [here](https://github.com/Azure/acs-engine/tree/master/examples/k8s-upgrade)

If you are on ACS then you will have to upgrade manually - or use a configuration management tool.  ACS uses `hyperkube` (an all-in-one binary of K8S components) to bootstrap the cluster, so you will need to upgrade the hyperkube images on all the nodes and then the manifests to reflect the new version.  The manifests are located in `/etc/kubernetes/manifests/` directory of the master nodes.

For clusters that were deployed using `kubeadm` then follow these [instructions](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm-upgrade-1-8/).  

If your cluster is based on [CoreOS Tectonic](https://coreos.com/tectonic/) or [Rancher](http://rancher.com/kubernetes/), then look at the docs for those distributions.

## <a id="backup"></a>Backup And Disaster Recovery

At any point, you need to be able to re-create your environment to a well-known state.  There are 4 key areas of focus:
1. The infrastructure.  Whether deployed to the cloud or on-premise, you should have fully automated scripts to be able re-provision the environment including network, compute, storage resources, identity etc.
2. The K8S cluster configuration.  This also should be automated and the provisioning approach you use should take this into account.
3. The data.  The cluster configuration is stored in etcd and any persistent volumes.  This data needs to be backedup on a scheduled basis.  There should be a process and scripts to restore the etc cluster from the snapshot.  
4. The application containers that are deployed to kubernetes.  This is the easiest part as your containers will be in a container registry and the desired state is in etcd.

There are multiple means to achieve this, from custom scripting (you don't want to do this!!) to using available products.  If you are deploying to Azure, GCP, AWS or on-premise, you can use [Heptio Ark](https://heptio.com/products/#heptio-ark) for steps 2, 3, 4.
