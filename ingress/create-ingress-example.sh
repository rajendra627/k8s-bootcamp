#/usr/bin/bash

namespace=ingress-example

kubectl create namespace $namespace
kubectl create -f ingress-controller.yml --namespace $namespace
kubectl create -f pod-details-service-v1.yml --namespace $namespace
kubectl create -f pod-details-service-v2.yml --namespace $namespace
kubectl create -f ingress-rule-single-host.yml --namespace $namespace
kubectl create -f ingress-rule-multiple-host.yml --namespace $namespace