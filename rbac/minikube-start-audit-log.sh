#/usr/bin/bash

# To use the audit2rbac tool start up minikube with the following options.
# Note: This will only work with v1.9 K8S as the audit log must be in JSON format.

minikube start \
--extra-config=apiserver.Authorization.Mode=RBAC \
--extra-config=apiserver.Audit.LogOptions.Path=/var/log/apiserver/audit.log \
--extra-config=apiserver.Audit.LogOptions.MaxAge=30 \
--extra-config=apiserver.Audit.LogOptions.MaxSize=100 \
--extra-config=apiserver.Audit.LogOptions.MaxBackups=5 \
--feature-gates=AdvancedAudit=true
