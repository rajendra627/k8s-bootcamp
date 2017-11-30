#!/bin/bash

###################################################################################################
# Script Name: deploy-jenkins.sh
# Author: Igor Ljaskevic
# Description: Validates then deploys an ARM template.  It will look for an azureDeploy.json and
# azureDeploy.parameters.json then validate it and if valid, deploy it.
#
# Options:
#
# -g <resourceGroup>
# -n <deploymentName>
# -s <storageAccount>
# -v if provided will only validate not deploy
#
#######################################################################################################
SECONDS=0

resourceGroup=''
deploymentName=''
storageAccount=''
## Currently, AKS is only available in 'eastus,westeurope,centralus' regions
resourceGroupLocation='eastus'
template='arm/azureDeploy.json'
parameters='arm/azureDeploy.parameters.json'
tempParameters='arm/temp.parameters.json'
justValidate=false

function log {
    echo "deploy-jenkins.sh --> $*"
}

function usage {
    log "To validate and deploy:  ./deploy-jenkins.sh -g <resourceGroup> -n <deploymentName> -s <storageAccountName>"
    log "To just validate: add the ARM template -v switch"
}

function check_resource_group {
    rgExists="$(azure group list | grep ${resourceGroup})"
    if [[ !  -z  $rgExists  ]]
    then
        log "Resource group '${resourceGroup}' already exists"
        azure group show "${resourceGroup}"
        read -r -p "Do you wish to deploy to this resource group? [y/N] " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
        then
            log "Deploying to '${resourceGroup}' resource group"
        else
            exit 1
        fi
    else
        log "Resource group '${resourceGroup}' not found"
        log "Creating new resource group called '${resourceGroup}' in 'East US' region"
        azure group create "${resourceGroup}" "${resourceGroupLocation}"
    fi
}

function prepare_storage {
    create_storage_account
    create_storage_containers
}
function create_storage_account {
    log "Getting location of Resource Group - ${resourceGroup}"
    resourceGroupLocation="$(azure group show -n ${resourceGroup} | awk ' /'Location'/ {print $3} ' | head -n1 )"
    log "Found resource group location = ${resourceGroupLocation}"

    log "Checking if storage account already (${storageAccount}) exists..."
    azure storage account list | grep 'Storage' | awk '{ print $2;}' | grep -q "^${storageAccount}$";
    grepReturn=$? # Needs to be called right after the command whose return code we want to capture
    log "...done!"

    if [[ $grepReturn -eq 0 ]]
    then
        log "Storage account '${storageAccount}' already exists!"
        azure storage account show "${storageAccount}" -g "${resourceGroup}"
        read -r -p "Do you wish to deploy to this storage account? [y/N] " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
        then
            log "Deploying to '${storageAccount}' storage account"
        else
            exit 1
        fi
    else
        log "No existing storage account called ${storageAccount}"
        log "Creating storage account and getting storage connectionString and accessKey"
        azure storage account create --sku-name "LRS" --kind "Storage" -l "${resourceGroupLocation}" -g "${resourceGroup}" "${storageAccount}" || exit 1
    fi

    log "Replacing placeholders in .parameters.json file with new storage account info"
    cp "${parameters}" "${tempParameters}"
    if [ "$(uname)" == "Darwin" ]; then # Mac
        log "User is on a Mac - Installing GNU tools for Mac"
        brew install gnu-sed --with-default-names
    elif [ "$(uname)" == "Linux" ]; then # Linux
        log "User is on a Linux - do nothing"
    fi

    log "Replacing placeholders in ARM template parameters file"
    sed -i "s~STORAGE_ACCOUNT_NAME~${storageAccount}~g" "${tempParameters}" || exit 1

    read -r -p "Enter DNS prefix for build server (must be globally unique): " buildServerDnsPrefix
    sed -i "s~BUILD_SERVER_UNIQUE_DNS_PREFIX~${buildServerDnsPrefix}~g" "${tempParameters}" || exit 1

    localPubKey='keys/id_rsa.pub'
    if [ -e ~/.ssh/id_rsa.pub ]; then
        log "Found local public SSH key -> ~/.ssh/id_rsa.pub"
        read -r -p "Do you wish to use local '~/.ssh/id_rsa.pub' for Build server access? [y/N] " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
        then
            log "Using local public SSH key for Build server access"
            publicSshKey="$(cat ~/.ssh/id_rsa.pub)"
        else
            log "Using default public SSH keys in 'keys' folder for Build server access"
            publicSshKey="$(cat $localPubKey)"
        fi
    fi
    log "Public SSH Key --> $publicSshKey"

    sed -i "s~PUBLIC_SSH_KEY~${publicSshKey}~g" "${tempParameters}" || exit 1
}

function create_storage_containers {
    log "Creating containers for vhds, access keys, and scripts"
    #azure storage container create -a "${storageAccount}" -k "${storageAccessKey}" "buildservervhds" || exit 1
}

function validate_template {
    log "start validating template..."

    check_resource_group

    #azure group template validate -g "${resourceGroup}" -f "$template" -e "${parameters}"

    if [ $? -ne 0 ]; then
        log "Template validation failed.  See error."
        exit 1
    else
        log "template is valid."
    fi
}

function deploy_template {
    if ! $justValidate
    then
        log "start deploying template..."
        azure group deployment create -f "${template}" -e "${tempParameters}" -g "${resourceGroup}" -n "${deploymentName}"
    fi
}

function cleaup_parameters_file {
    log "Cleaning up temporary files"
    rm "${tempParameters}"

    if [ -f "${tempParameters}.original" ]
    then
        rm "${tempParameters}.original"
    fi
}

while getopts g:n:s:v opt; do
    case $opt in
        g)
            resourceGroup=${OPTARG}
            log "resourceGroup --> $resourceGroup"
            ;;
        n)
            deploymentName=${OPTARG}
            log "deploymentName --> $deploymentName"
            ;;
        s)
            storageAccount=${OPTARG}
            log "storageAccount --> $storageAccount"
            ;;
        v) #if true just validate and don't deploy'
            justValidate=true;
            log "validation only set to ${justValidate}"
            ;;
        \?) #invalid option
            log "${OPTARG} is not a valid option"
            usage
            exit 1
            ;;
    esac
done

validate_template
if $justValidate
then
    exit 0
fi
if [ -z "$resourceGroup" ] ;then echo "-g must be provided"; exit 1; fi
if [ -z "$deploymentName" ] ;then echo "-n must be provided"; exit 1; fi
if [ -z "$deploymentName" ] ;then echo "-n must be provided"; exit 1; fi

prepare_storage
deploy_template
cleaup_parameters_file
duration=$SECONDS
echo "***** $(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed."

exit 0
