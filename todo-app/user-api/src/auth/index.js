const testAuthMode = require('./testAuthMode');

const logger = require('../logger');


module.exports = (testMode) => {
    if (testMode) {
        logger.info(`Using test authentication mode - testMode = ${testMode}`);
        return testAuthMode;
    } else {
        logger.info(`Using Azure AD authentication mode - testMode = ${testMode}`);
        console.log("UNEXPECTED");
    }
};