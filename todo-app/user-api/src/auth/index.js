const testAuthMode = require('./testAuthMode');


module.exports = (testMode) => {
    if (testMode) {
        return testAuthMode;
    } else {
        console.log("UNEXPECTED");
    }
};