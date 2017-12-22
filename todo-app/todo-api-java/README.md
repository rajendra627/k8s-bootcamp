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

-
