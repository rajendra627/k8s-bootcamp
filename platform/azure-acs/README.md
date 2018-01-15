## Deployment script for Azure Container Services Kubernetes cluster ##

This script provisions a Kubernetes cluster on Azure using ACS

## Pre-requisited ##

- The following CLI tools are required:
  - `az` - Azure CLI 2.0 tool (v2.0.21 or greater)
  - `kubectl` - Kubernetes cluster command tool (v1.8.4 or greater)
- Before executing any commands, you need to be logged in `az login`

## Get Started ##

To deploy a Kubernetes cluster run the following command:

*NOTE: `-n <Number-of-Nodes>` is optional and defaults to 3 nodes.

`./deploy-acs-cluster.sh -g <Resource-Group-Name> -c <Cluster-Name> -n <Number-of-Nodes>`

This deploys a cluster with 1 master node and 3 agent nodes.

## Explanation ##

This scripts creates a Kubernetes ACS cluster on Azure,
