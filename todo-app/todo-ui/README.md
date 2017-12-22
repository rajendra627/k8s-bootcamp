
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

# Running the App #

run the app: 
``yarn install``
``yarn run start``

Adding environment variables:
 *environment variables must start with REACT_APP_*
    ``REACT_APP_TEST_MODE=true yarn run start``

Currently the front end app supports (2) environment variables 
REACT_APP_TEST_MODE - this will set the app in test mode and allow a user to login without AD (NOTE: API's must be in test mode)
REACT_APP_CLIENT_ID - this is the Azure AD ID.  Default is 'aa271f78-210a-46f2-a92d-ea0f5664aa39' which is steven mucci's AD 


# Testing #

The app contains units tests as well as e2e tests.

# Unit Tests #
The unit tests are running using create react app's setup of [Jest](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)
 
You can run the unit tests in watch mode(re-run as you save) by running:
``yarn run test``

or you can run Jest as a one time process(not in watch mode) with:
``CI=true yarn run test``

# E2E tests #

The e2e tests are running using [Protractor](http://www.protractortest.org/#/tutorial)

you must first run Webdriver:
``webdriver-manager update``
``webdriver-manager start``

``yarn run e2etest``

this will run all tests in 'src/test/e2e/*.e2e.js'






