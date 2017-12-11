# Role Based Access Control #

When you provision a K8S cluster on Azure Container Service using the az cli, RBAC is not enabled by default.  Therefore, everyone will have full read/write access.  But what happens if you need to provide other users/roles restricted access to the K8S cluster?  For example, you want "QA" roles having read/write access to only their environment, and "Dev" roles having read/write access to only their evironment. This is where RBAC comes into play.

## Objective ##

Provision a user with the "qa" role that will only have read/write permission to the "qa" namespace.  Provision a "jenkins" role to deploy to "qa" and "production" namespaces.  We also need to support both interactive (e.g. user enters credentials) and non-interactive scenarios (e.g. a CI/CD server needs to authenticate to deploy a new build).

## Authentication and Authorization in K8S ##

K8S supports a very flexible authentication/authorization model that is extensible through plugins and modules.  There are different authentication and authorization modules to support different requirements - from simple username/password to x509 certificates to Open ID Connect with an external Identity Provider, and more.

![access-control-overview](./access-control-overview.svg)

You can configure multiple authentication modules to support different authentication scenarios within your cluster.  Each of the enabled authentication modules will be invoked and short-circuited when the first module authenticates the request.  If all the modules cannot authenticate then access is denied.  This is important to support both interactive and non-interactive authentication within the same cluster.

For our purposes, we will be using two authentication strategies:
- Azure OpenID Connect (to authenticate a human user)
- HTTP Basic Auth with simple username/password (to authenticate the Jenkins server)

See [Controlling access to the K8S API](https://kubernetes.io/docs/admin/accessing-the-api/) to set up HTTP Basic Auth authentication, and see [Azure Active Directory plugin for client authentication with OIDC](https://github.com/kubernetes/client-go/tree/master/plugin/pkg/client/auth/azure) to set up authentication with your Azure AD tenant.


## Enabling RBAC ##

In order to enable RBAC, you need to:
1. ssh into the master node(s) and restart the kube-apiserver with ``--authorization-mode=RBAC``
2. Define permissions (roles) that you want to grant to a given user/group
3. Bind defined permissions to the a given user/group

For 1, login to your Azure portal, navigate to the resource group where you deployed your cluster and find the master VM resource.  You can get the IP to the master and ssh into the master with 'azureuser' (The default username that selected during provisioning).  

![IP address in Azure Portal](./azure-portal.png)

```
ssh azureuser@xxx.xxx.xxx.xxx
```

For 2 and 3 see below.


## Reference ##

- [Using RBAC Authorization](https://kubernetes.io/docs/admin/authorization/rbac/)
- [OpenID Connect Auth Flow on Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-openid-connect-code)
- [K8S Authentication with OpenID Connect tokens](https://kubernetes.io/docs/admin/authentication/#openid-connect-tokens)
- [Excellent guide by Bitami](https://docs.bitnami.com/kubernetes/how-to/configure-rbac-in-your-kubernetes-cluster/)