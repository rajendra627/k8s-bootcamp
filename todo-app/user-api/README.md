# User API #

> API that is used to manage users. Through this API, a client will be able to create and retrieve users.

### Authentication Modes ###

> For authentication, the API supports both production mode and test mode. For both of these modes, the
authentication token is passed through the HTTP `Authorization` header.

- Production authentication goes through the Azure Active Directory. The authentication token that is passed in
is acquired from Azure through the intrinsic flow
- Test mode requires the client application to pass through a Base 64 encoded JSON string as the authentication token.
The format of the JSON is: `{"email":"test@architech.ca","firstName":"John","lastName":"Smith"}`. You can encode the
JSON string from this [site](https://www.base64encode.org/).

### Swagger ###

> Swagger is incorporated in this project to document the REST endpoints and to allow developers to play around with
the API. The Swagger URL is `http://${HOST}:${PORT}/swagger`

### Environment Variables ###

You can set the following environment to customize how the API runs:

- `IS_TEST_MODE` = whether to run in test mode or not
- `APP_LOG_LEVEL` = application log level
- `AZURE_IDENTITY_META_DATA` = for instance, https://login.microsoftonline.com/architech.onmicrosoft.com/v2.0/.well-known/openid-configuration
- `AZURE_APP_ID` = Azure AD registered application ID

### Azure AD Setup ###

> See [Azure AD OpenID Connect Example](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-protocols-openid-connect-code) for instructions on how to get these values for your Azure AD tenant.