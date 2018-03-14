# Secrets Management with Hashicorp Vault #

Kubernetes has a Secret resource type, however, it is essentially a ConfigMap with base64 encoded values.  Furthermore, with secrets alone, there is no built-in means to manage key revocation, auditing etc.  In order to support a true "zero-trust" model, you should use a robust key management solutions such as Vault or Azure's own KeyVault.  Here we will deploy Vault as it supports native integration with K8S via the ServiceAccount model.

## Reference ##

- [Vault and Secret Management in Kubernetes](https://www.youtube.com/watch?v=FhUJYwM_xy0)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes.html)
- [vault-plugin-auth-kubernetes](https://github.com/hashicorp/vault-plugin-auth-kubernetes)