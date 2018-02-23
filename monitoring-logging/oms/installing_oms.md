# Azure Operations Management Suite for Kubernetes #

Azure OMS is a very powerful tool to provide operational visibility into all your wordloads on Azure.  Whether it is IaaS, PaaS or your Kubernetes cluster, OMS provides a single holistic view of all your mission critical services in one place.  Azure OMS is comprised of multiple services, we will be using Log Analytics in our scenario.

1. [Setup Log Analytics service on Azure through the Azure Portal](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-quick-collect-linux-computer)
2. Deploy the OMS agent as a daemonset on your K8S cluster.  See [OMS-Kubernetes](https://github.com/Microsoft/OMS-docker/tree/master/Kubernetes)

The OMS agent will be deployed as a Daemonset onto all nodes - both master and worker nodes.
