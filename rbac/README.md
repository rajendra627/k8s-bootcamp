# Role Based Access Control #

When you provision a K8S cluster on Azure Container Service using the az cli, the K8S cluster is configured with RBAC enabled by default.  In addition, cluster admin roles and role bindings are created and you are given full read/write privileges to the cluster resources.  But what happens if you need to provide other users/roles restricted access to the K8S cluster?  For example, you want "QA" roles having read/write access to only their environment, and "Dev" roles having read/write access to only their evironment. This is where RBAC comes into play.

## Objective ##

Provision a user with the "qa" role that will only have read/write permission to the "qa" namespace.  Provision a "jenkins" role to deploy to "qa" and "production" namespaces.  We also need to support both interactive (e.g. user enters credentials) and non-interactive scenarios (e.g. a CI/CD server needs to authenticate to deploy a new build).

## Authentication and Authorization in K8S ##

K8S supports a very flexible authentication/authorization model that is extensible through plugins and modules.  There are different authentication and authorization modules to support different requirements - from simple username/password to x509 certificates to Open ID Connect with an external Identity Provider.  In addition, you can configure multiple authentication modules to support different authentication scenarios within your cluster.  This is important to support both interactive and non-interactive authentication.

![access-control-overview](./access-control-overview.svg)

See the references below for futher details.

## Reference ##

- [Controlling access to the K8S API](https://kubernetes.io/docs/admin/accessing-the-api/)
- [Using RBAC Authorization](https://kubernetes.io/docs/admin/authorization/rbac/)
- [Azure Active Directory plugin for client authentication with OIDC](https://github.com/kubernetes/client-go/tree/master/plugin/pkg/client/auth/azure)
- [OpenID Connect Auth Flow on Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-openid-connect-code)
- [K8S Authentication with OpenID Connect tokens](https://kubernetes.io/docs/admin/authentication/#openid-connect-tokens)