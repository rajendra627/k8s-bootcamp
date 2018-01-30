## Secrets ##

The following secrets are set in the Kubernetes cluster and are loaded as environment variables in To-Do UI, To-Do API, and User API containers in order for the apps to allow Azure AD integration.

**NOTE**: Careful when editing secrets in IDE's that auto-append newline to files. Secrets have issues with newlines.

### ad_identity ###

OpenID url for your Azure Active Directory

### azure_app_id ###

Application ID of the registered application under your Azure AD

### azure_client_secret ###

Client secret of the registered application under your Azure AD
