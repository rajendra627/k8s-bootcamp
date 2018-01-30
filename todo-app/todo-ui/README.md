
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Running the App #

## Environment Variables (The following environment variables need to be set to get the dependent microservices up and running) ##

 * AZURE_APP_ID - (Required) This is the ID of the application registered in Azure AD
 * AZURE_CLIENT_SECRET - (Required) The value of a secret key inside the registered application in Azure AD
 * AZURE_IDENTITY_META_DATA - (Required) The URL to retrieve metadata from Azure AD. This will be unique to the Azure AD instance.
 It is typically of the form: `https://login.microsoftonline.com/xxxxxxorg.onmicrosoft.com/v2.0/.well-known/openid-configuration`
 * IS_TEST_MODE - (Optional; Defaults to false) Whether to start the microservices in "Test Mode", meaning Azure AD is not required to login to the app.

## Running the app in development ##

### Development Prerequisites ###

 * Node 8.x
 * Yarn 1.x *Note*: npm should work here as well but we don't guarantee the package-lock.json is maintained.

### Development Environment Variables ###

On top of [Environment Variables](#environment-variables) defined, the following are needed during development of the todo-ui:

 * REACT_APP_TEST_MODE (Optional; Defaults to false) - this will set the app in test mode and allow a user to login without AD (NOTE: API's must be in test mode as well)
 * REACT_APP_CLIENT_ID - (Required) This is the ID of the application registered in Azure AD. *Note*: This is the same value as AZURE_APP_ID
 * REACT_APP_TENANT - (Required) The tenant which owns the particular instance of Azure AD.
 This is typically of the form `xxxxxxxorg.onmicrosoft.com`. This should match the middle section of the URL found in the AZURE_IDENTITY_META_DATA variable.

These values of environment variables of the pattern REACT_APP_* are automatically injected into the application where ever `process.env.REACT_APP_*` is found.

### Development Execution ###

When the environment variables are set run the app:

 1. `docker-compose up`
 1. `yarn install`
 1. `yarn run start`

In your browser go to `http://localhost:3000`

## Running the app in docker-compose ##

To test out how the application behaves inside of a container it can be helpful to bring it up in a docker-compose environment locally.

### Docker Container Environment Variables ###

On top of [Environment Variables](#environment-variables) defined, the following are needed during execution in a docker environment:

 * AZURE_AD_TENANT - (Required) The tenant which owns the particular instance of Azure AD. *Note*: this is the same value as
 REACT_APP_TENANT would be.

The Todo-UI container also utilizes the environment variables used in the other microservices:

 * AZURE_APP_ID - This would be the same value as REACT_CLIENT_SECRET in development mode
 * IS_TEST_MODE - This would be the same value as READT_APP_TEST_MODE in development mode

### Building the Docker Container ###

With all of the necessary environment variables set, run the following command:
`docker-compose -f docker-compose.yml -f docker-compose.build.yml build`

*Note*: The container can also be built with plain old docker commands.

### Docker Execution ###

With all of the necessary environment variables set, run the following command:
`docker-compose -f docker-compose.yml -f docker-compose.build.yml up`

In your browser go to `http://localhost`

*Note*: This attempts to bind to port 80 on your host OS. It will fail if another process is already bound to that port.

# Testing #

The app contains units tests as well as e2e tests.

## Unit Tests ##

The unit tests are running using create react app's setup of [Jest](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

You can run the unit tests in watch mode(re-run as you save) by running:
``yarn run test``

or you can run Jest as a one time process(not in watch mode) with:
``CI=true yarn run test``

## E2E tests ##

The e2e tests are running using [Protractor](http://www.protractortest.org/#/tutorial)

you must first run Webdriver:
``webdriver-manager update``
``webdriver-manager start``

``yarn run e2etest``

this will run all tests in 'src/test/e2e/*.e2e.js'