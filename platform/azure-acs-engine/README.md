# ACS Engine #

ACS Engine is an Open Source project that is the basis for Kubernetes on Azure.  Azure services such as ACS and AKS (managed Kubernetes) depends on the code upstream in the ACS Engine project.

While Azure K8S services such as ACS and AKS provide many benefits, such as automating provisioning of the cluster, making upgrading the cluster, adding new nodes, snapshoting etcd, etc very easy, you get what you get.  What I mean by this is that you have accept the K8S versions, features available.  If you need full control of your K8S deployment, say you want to use the latest version of K8S, or you want to enable specific features, a different CNI plugin, etc, then you will need to use ACS Engine.

ACS Engine is a tool that will generate the ARM (Azure Resource Manager) templates required to provision the compute, network, storage resources as well as extensions to deploy Docker and all the required K8S components.

## References ##

* [ACS Engine Git Repo](https://github.com/Azure/acs-engine)