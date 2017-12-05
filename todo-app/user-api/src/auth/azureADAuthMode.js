const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const config = require('../config');


const strategy = new BearerStrategy(
    {
        identityMetadata: config.azureIdentityMetaData,
        clientID: config.azureClientId,
        validateIssuer: false,
        passReqToCallback: true,
        isB2C: false,
        allowMultipleAudiencesInToken: false
    },
    (req, {email, firstName, lastName}, done) => {
        done(null, {email, firstName, lastName});
    }
);

passport.use(strategy);

module.exports = passport.authenticate('oauth-bearer', {session: false});