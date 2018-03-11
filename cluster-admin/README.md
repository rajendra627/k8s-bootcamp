# Cluster Administration #

Here we will cover some fundamental cluster administration considerations on Azure.  We will focus on Azure specific concerns and leave the more general overview to the [excellent docs](https://kubernetes.io/docs/tasks/) at K8S.io. 

## Resource Quotas ##

## Limit Ranges ##

## Container Network Interface ##

## Upgrading the Cluster ##

The steps to upgrade your cluster depends on how it was deployed.  If you are on AKS, then the az cli has a command that will upgrade the cluster `az aks upgrade`.  Just provide the name of your current cluster, the K8S version to upgrade to.  Note, your cluster will be unavailable during an upgrade.

If you deployed using ACS Engine, then then you would upgrade using the command `acs-engine upgrade`.  See details [here](https://github.com/Azure/acs-engine/tree/master/examples/k8s-upgrade)

If you are on ACS then you will have to upgrade manually - or use a configuration management tool.  ACS uses `hyperkube` (an all-in-one binary of K8S components) to bootstrap the cluster, so you will need to upgrade the hyperkube images on all the nodes and then the manifests to reflect the new version.  The manifests are located in `/etc/kubernetes/manifests/` directory of the master nodes.

For clusters that were deployed using `kubeadm` then follow these [instructions](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm-upgrade-1-8/).  

If your cluster is based on [CoreOS Tectonic](https://coreos.com/tectonic/) or [Rancher](http://rancher.com/kubernetes/), then look at the docs for those distributions.
