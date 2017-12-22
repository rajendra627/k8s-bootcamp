# Todo API #

> API that is used to manage the Todo list of the current user. Through this API, the user will be able to create,
retrieve, update and delete Todo items. The user must be authenticated in order to use this API.

### Authentication Modes ###

> For authentication, the API supports both production mode and test mode. For both of these modes, the
authentication token is passed through the HTTP `Authorization` header.

- Production authentication goes through the Azure Active Directory. The authentication token that is passed in
is acquired from Azure through the intrinsic flow
- Test mode requires the client application to pass through a Base 64 encoded JSON string as the authentication token.
The format of the JSON is: `{"email":"test@architech.ca","firstName":"John","lastName":"Smith"}`. You can encode the
JSON string from this [site](https://www.base64encode.org/).

### Dependencies ###

> The Todo API depends on the User API to identify the current user. It receives the current user's email from Azure
and delegates to the User API to retrieve the user data associated to the email.

### Swagger ###

> Swagger is incorporated in this project to document the REST endpoints and to allow developers to play around with
the API. The Swagger URL is `http://${HOST}:${PORT}/swagger-ui.html`

### Environment Variables ###

You can set the following environment to customize how the API runs:

- `IS_TEST_MODE` = whether to run in test mode or not
- `APP_LOG_LEVEL` = application log level
- `AZURE_IDENTITY_META_DATA` = for instance, https://login.microsoftonline.com/architech.onmicrosoft.com/v2.0/.well-known/openid-configuration
- `AZURE_APP_ID` = Azure AD registered application ID
- `AZURE_CLIENT_SECRET` = Azure AD registered application's secret key

### Azure AD Setup ###

> For more information on how to set up Azure AD authentication, please visit this
[site](https://docs.microsoft.com/en-us/java/azure/spring-framework/configure-spring-boot-starter-java-app-with-azure-active-directory).
Focus on the `Create and configure a new Azure Active Directory instance` section of the document.
