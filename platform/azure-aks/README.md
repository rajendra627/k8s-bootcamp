# WARNING! Azure AKS service is still in preview and should NOT be used in Production! #

This provisioning script is here for future use/reference when Azure AKS becomes generally available and production ready.

## Pre-requisited ##

- The following CLI tools are required:
  - Azure CLI 2.0 (v2.0.21 or greater)
  - `kubectl` (v1.8.4 or greater)#
- AKS preview service needs to be enabled on your Azure subscription with the following command:
  `az provider register -n Microsoft.ContainerService`
- Before executing any commands, you need to be logged in `az login`

## References ##

- [Azure Kubernetes Service](https://docs.microsoft.com/en-ca/azure/aks/intro-kubernetes)