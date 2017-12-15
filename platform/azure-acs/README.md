## Deployment script for Azure Container Services Kubernetes cluster ##

This script provisions a Kubernetes cluster

## Pre-requisited ##

- The following CLI tools are required:
  - `az` - Azure CLI 2.0 tool (v2.0.21 or greater)
  - `kubectl` - Kubernetes cluster command tool (v1.8.4 or greater)
- Before executing any commands, you need to be logged in `az login`

## Get Started ##

To deploy a Kubernetes cluster with default number of Master and Agent nodes run the following command:

`./deploy-acs-cluster.sh -g <Resource-Group-Name> -c <Cluster-Name>`