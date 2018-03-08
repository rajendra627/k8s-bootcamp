# Deploying Kubernetes On-premise #

Although cloud in most cases is the way to go, there will be situations that Kubernetes must be deployed on-premise.  There are many options to deploy Kubernetes on-premises.  Here we list some different options as well as links to resources. I will then deploy a K8S cluster using kubeadm.

## Kubeadm ##

Kubeadm is an open source tool that provides a "base" installation of Kubernetes.  You install the kubelet and docker on all nodes, then kubeadm uses the kubelet to deploy the rest of the K8S components on the master and worker nodes.  Essentially, kubernetes deploys itself using its own components!  This is called "self-hosting".  

Kubeadm provides the fastest way to deploy a base cluster.  However, it is not a production cluster.  For example, if you want an HA etcd deployment with at least 3 etcd instances on their own dedicated nodes, then you need to deploy etcd separately.

See [kubeadm overview](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/)

## Kubespray ##

## CoreOS Tectonic ##

## Rancher OS ##

## Redhat Openshift Container Platform ##