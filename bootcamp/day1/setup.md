# Setting up your environment #

You will need the following tools installed:

* Azure cli
* docker
* Helm
* kubectl
* Visual Studio Code

## Installing Azure CLI ##

Install the latest version of azure cli for your operating system from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest). 

## Install Docker ##

Install docker for your operating system. 

* For [Windows](https://docs.docker.com/docker-for-windows/install/)
* For [macOS](https://docs.docker.com/docker-for-mac/install/)
* For [Ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/#docker-ee-customers)

After you have installed docker and the azure cli, run the following commands to ensure they have been installed.

```
az --version
docker version
docker-compose version
```

## Install Visual Studio Code ##

Download and install VS Code for your OS.  [https://code.visualstudio.com/](https://code.visualstudio.com/)

Install the following extensions (search in the extensions tab):

* Kubernetes Support 
* vs-kubernetes
* vscode-helm
* Docker

The above extensions provide syntax highlighting, code snippets and more for working with Docker, Kubernetes and Helm artefacts.

## Verify your Azure subscription ##
Make sure all the required resource providers are registered in your Azure subscription.  As you will be creating network, compute and storage resources on Azure, and you will be using Azure Container Service and Azure Container Service, you need to ensure you have the following providers registered in your Azure subscription:

- Microsoft.Network
- Microsoft.Storage
- Microsoft.Compute
- Microsoft.ContainerService 
- Microsoft.ContainerRegistry

To determine which providers are registered run this command:

```
#login to your Azure subscription
az login

#list your registered providers
az provider list -o table | less
```

The registration state of each of the providers above should be 'Registered'.  If not, you need to register the provider using the following command:

```
az provider register -n <provider>
```

For example, 

```
az provider register -n Microsoft.ContainerService
```

## Create a K8S cluster on Azure and install kubectl ##

After you have verified your subscription has the necessary providers registered, create a test K8S cluster on Azure. To do so, run the following commands (you already have to be logged into Azure via the CLI). Note, I use the resource group name ``k8s-example`` and cluster name ``test-cluster`` but you can name them what you want.

* Create a resource group for your cluster

```
az group create -n k8s-example -l canadaeast
```

* Create the cluster
```
az acs create -n test-cluster -g k8s-example --generate-ssh-keys --master-count 1 --agent-count 1 -t Kubernetes
```

* After the cluster has been successfully created install kubectl 
```
az acs kubernetes install-cli
```
* Then get the credentials to your K8S cluster. 
``` 
#this will download and install the certificates to access your cluster 
#in your ~/.kube/config file

az acs kubernetes get-credentials -n test-cluster -g k8s-example
```

* Verify your kubectl installation by listing the nodes in your cluster
```
kubectl get nodes
```

* Start up proxy to tunnel to the Kubernetes Dashboard
```
kubectl proxy
```

Open a brower and navigate to http://127.0.0.1:8001/ui and you will see the dashboard.

## Install Helm ##

To install helm follow the instruction [here](https://github.com/kubernetes/helm/blob/master/docs/install.md).  Note that to install the server side of Helm (tiller), you need the K8S cluster running.  In ACS tiller is installed but you need to upgrade by running:

```
helm init --upgrade 
```

## Bringing down you cluster ##

In order to not incur Azure costs, you should tear down your cluster when not in use.  At the end of each day just delete the resource group. 

```
az group delete -n k8s-example
```
## Setting up Minikube ##

This part is only for the RBAC portion of the exercises.  Unfortunately, ACS currently does not support RBAC.  To enable RBAC on Azure, you will need to leverage [ACS Engine](https://github.com/Azure/acs-engine), however, that is an advanced topic so we will be using Minikube to demonstrate RBAC concepts.

See the installation instructions for your OS [here](https://github.com/kubernetes/minikube).  Note for Windows, you need to make a decision if you are going to use Hyper-V or Virtualbox for virtualization.  If you have installed Docker with Hyper-V then you have to choose Hyper-V for Minikube also to support both.

Once installed, run the following command to start up Minikube.  This will download the latest release of K8S and start a single node cluster locally.

```
minikube start
```

To stop minikube and bring down the cluster:

```
minikube stop
```

Some useful minikube commands:

```
#to get the IP to your minikube master
minikube ip

#to get the URL of a service deployed to minikube
minikube service <service-name>

#to ssh into a pod
minikube ssh <pod-name>

#to delete the local K8S VM
minikube delete
```

## Next... ##

Go to [Exercise 1](./exercise1.md)

## References ##

* [Kubectl Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
* [Kubectl Command Reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)
* [Kubernetes on Azure](https://docs.microsoft.com/en-us/azure/container-service/kubernetes/container-service-intro-kubernetes)




