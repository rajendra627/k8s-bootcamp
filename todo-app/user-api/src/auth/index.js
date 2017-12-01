const passport = require('passport');
const {OIDCStrategy} = require('passport-azure-ad');

const config = require('../config/auth-config');
const registerRoutes = require('./routes');


passport.serializeUser((user, done) => done(null, user.oid));

passport.deserializeUser((oid, done) => done(err, {oid: user.oid}));

passport.use(
    new OIDCStrategy({
        identityMetadata: config.identityMetadata,
        clientID: config.clientID,
        responseType: config.responseType,
        responseMode: config.responseMode,
        redirectUrl: config.redirectUrl,
        allowHttpForRedirectUrl: config.allowHttpForRedirectUrl,
        clientSecret: config.clientSecret,
        validateIssuer: config.validateIssuer,
        isB2C: config.isB2C,
        issuer: config.issuer,
        passReqToCallback: config.passReqToCallback,
        scope: config.scope,
        loggingLevel: config.loggingLevel,
        nonceLifetime: config.nonceLifetime,
        nonceMaxAmount: config.nonceMaxAmount,
        useCookieInsteadOfSession: config.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.cookieEncryptionKeys,
        clockSkew: config.clockSkew,
    },
    (iss, sub, profile, accessToken, refreshToken, done) => {
        done(null, profile);
    })
);

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    registerRoutes(app);
};