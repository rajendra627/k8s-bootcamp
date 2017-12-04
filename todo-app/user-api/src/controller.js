const router = require('express').Router();

const config = require('./config');
const authMiddleware = require('./auth')(config.isTestMode);

const dao = require('./dao');


router.get('/', authMiddleware, async ({user: {email}}, res) => {
    const user = await dao.findUserByEmail(email);
    if (!user) {
        return res.sendStatus(404);
    }
    res.send(user);
});

router.post('/', authMiddleware, async ({user: {email, firstName, lastName}}, res) => {
    const existingUser = await dao.findUserByEmail(email);
    if (existingUser) {
        return res.sendStatus(400);
    }

    const newUser = await dao.createUser({email, firstName, lastName});
    res.send(newUser);
});

module.exports = router;