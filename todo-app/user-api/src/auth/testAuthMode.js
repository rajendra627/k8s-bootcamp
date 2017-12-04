const base64 = require('base-64');
const utf8 = require('utf8');


const TOKEN_HEADER_NAME = 'TestModeToken';

module.exports = (req, res, next) => {
    const token = req.get(TOKEN_HEADER_NAME);
    if (!token) {
        return res.status(403).send({message: 'Server running in test mode and requires TestModeToken header'});
    }

    const userData = utf8.decode(base64.decode(token));
    req.user = JSON.parse(userData);
    next();
};