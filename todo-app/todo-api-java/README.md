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

### Flow ###

### Dependencies ###

### Swagger ###

> Swagger is incorporated To play around with the Todo API, you can

### Running the A
