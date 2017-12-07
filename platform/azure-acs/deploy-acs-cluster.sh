#!/usr/bin/env bash

###################################################################################################
# Script Name: deploy-acs-cluster.sh
# Author: Igor Ljaskevic
# Description: Deploys Azure Container Service Kubernetes Cluster (AKS)
#
# Options:
#
# -g <resourceGroup>
# -c <clusterName>
# -n <nodeNumber>
#
#######################################################################################################
SECONDS=0

resourceGroup=''
clusterName=''
nodeNumber=''
clientId=''
clientSecret=''
## Currently, AKS is only available in 'eastus,westeurope,centralus' regions
resourceGroupLocation='eastus'
generatedAzureAcsKubeCredentials='acsGenerated.config'

function log {
    echo "deploy-cluster.sh --> $*"
}

function usage {
    log "To create cluster:  ./deploy-cluster.sh -g <resourceGroup> -c <clusterName> -n <nodeNumber>"
}

function check_resource_group {
    rgExists="$(az group list -o table | awk '{ print $1;}' | grep -x ${resourceGroup})"
    if [[ !  -z  $rgExists  ]]
    then
        log "Resource group '${resourceGroup}' already exists"
        az group show -n "${resourceGroup}"
        read -r -p "Do you wish to deploy to this resource group? [y/N] " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
        then
            log "Deploying to '${resourceGroup}' resource group"
        else
            exit 1
        fi
    else
        log "Resource group '${resourceGroup}' not found"
        log "Creating new resource group called '${resourceGroup}' in '${resourceGroupLocation}' region (default: 'East US')"
        az group create -n "${resourceGroup}" -l "${resourceGroupLocation}" || exit 1
    fi


    log "Getting location of Resource Group - ${resourceGroup}"
    resourceGroupLocation="$(az group show -n ${resourceGroup} -o table | awk ' /'${resourceGroup}'/ {print $1} ')"
    log "Found resource group location = ${resourceGroupLocation}"
}

function create_cluster {
  az acs create -g "${resourceGroup}" -n "${clusterName}" -t "Kubernetes" -l "${resourceGroupLocation}" --generate-ssh-keys
  # az acs create -g "${resourceGroup}" -n "${clusterName}" -t "Kubernetes" -l "${resourceGroupLocation}" --service-principal "${clientId}" --client-secret "${clientSecret}" --generate-ssh-keys
}

function get_cluster_credentials {
    subscriptionId="$(az account show --verbose -o tsv | awk '{print $2}')"
    echo "subId: ${subscriptionId}"
    # appIdAndPassword="$(az ad sp create-for-rbac -n ${clusterName}SP --role='Contributor' --scopes='/subscriptions/'${subscriptionId} --verbose -o tsv | awk '{print $1"\t"$4}')"
    appIdAndPassword="$(az ad sp create-for-rbac -n ${clusterName}SP --role Contributor  --scopes /subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}  --verbose -o tsv | awk '{print $1"\t"$4}')"
    echo "appIdAndPassword: ${appIdAndPassword}"
    clientId="$(echo ${appIdAndPassword} | awk '{print $1}')"
    clientSecret="$(echo ${appIdAndPassword} | awk '{print $2}')"
    echo "Client ID:\t${clientId}"
    echo "Client Secret:\t${clientSecret}"
}

function get_kubernetes_credentials {
    log "Getting ACS Kubernetes credentials -> ~/.kube/${generatedAzureAcsKubeCredentials}"
    az acs kubernetes get-credentials -f ~/.kube/${generatedAzureAcsKubeCredentials} -n "${clusterName}" -g "${resourceGroup}"
    log "Finished getting ACS Kubernetes credentials"
}

while getopts g:c:n:v opt; do
    case $opt in
        g)
            resourceGroup=${OPTARG}
            log "resourceGroup --> $resourceGroup"
            ;;
        c)
            clusterName=${OPTARG}
            log "clusterName --> $clusterName"
            ;;
        n)
            nodeNumber=${OPTARG}
            log "nodeNumber --> $nodeNumber"
            ;;
        \?) #invalid option
            log "${OPTARG} is not a valid option"
            usage
            exit 1
            ;;
    esac
done

if [ -z "$resourceGroup" ] ;then echo "-g (Resource Group Name) must be provided"; exit 1; fi
if [ -z "$clusterName" ] ;then echo "-c (Cluster Name) must be provided"; exit 1; fi
## if [ -z "$nodeNumber" ] ;then echo "-n (Node Number) must be provided"; exit 1; fi

check_resource_group
# get_cluster_credentials
create_cluster
get_kubernetes_credentials

duration=$SECONDS
echo "***** $(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

exit 0
