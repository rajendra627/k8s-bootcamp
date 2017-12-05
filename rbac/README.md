# Role Based Access Control #

When you provision a K8S cluster on Azure Container Service using the az cli, the K8S cluster is configured with RBAC enabled by default.  In addition, cluster admin roles and role bindings are created and you are given full read/write privileges to the cluster resources.  But what happens if you need to provide other users/roles restricted access to the K8S cluster?  For example, you want "QA" roles having read/write access to only their environment, and "Dev" roles having read/write access to only their evironment.  This is where RBAC comes into play.

## Objective ##

Provision a user with the "qa" role that will only have read/write permission to the "qa" namespace.

## Authentication and Authorization in K8S ##

In order to achieve our objective, you need to understand how access to K8S resources are controlled.  See references below for the most up to date documentation.

1. We need to authenticate with K8S API Server
2. We need to set up Role/ClusterRole that defines the permissions a given role can have
3. We need to bind those roles to user/groups through RoleBindings and ClusterRoleBindings.

## Reference ##

- [Controlling access to the K8S API](https://kubernetes.io/docs/admin/accessing-the-api/)
- [Using RBAC Authorization](https://kubernetes.io/docs/admin/authorization/rbac/)

