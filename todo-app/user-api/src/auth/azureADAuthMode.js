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
    (req, {upn, given_name, family_name}, done) => {
        done(null, {email: upn, firstName: given_name, lastName: family_name});
    }
);

passport.use(strategy);

module.exports = passport.authenticate('oauth-bearer', {session: false});