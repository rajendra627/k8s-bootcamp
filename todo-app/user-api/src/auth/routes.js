const passport = require('passport');


module.exports = app => {
    app.get('/login', (req, res, next) => {
        passport.authenticate('azuread-openidconnect', {
            response: res,
            failureRedirect: '/'
        })(req, res, next);
    });

    app.post('/auth/openid/return',
        (req, res, next) => {
            passport.authenticate('azuread-openidconnect', {
                response: res,
                failureRedirect: '/'
            })(req, res, next);
        },
        (req, res) => {
            res.redirect('/');
        });

    app.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });
}