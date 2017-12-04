const router = require('express').Router();

const config = require('./config');
const authMiddleware = require('./auth')(config.isTestMode);

const dao = require('./dao');
const logger = require('./logger');


router.get('/', authMiddleware, async ({user: {email}}, res) => {
    logger.info(`GET /user - where email = ${email}`);

    try {
        const user = await dao.findUserByEmail(email);
        if (!user) {
            logger.info(`GET /user - user not found where email = ${email}`);
            return res.sendStatus(404);
        }

        logger.info(`GET /user - user found where email = ${email}`);
        res.send(user);
    } catch (e) {
        logger.error(`Error getting user where email = ${email}`);
        res.sendStatus(500);
    }
});

router.post('/', authMiddleware, async ({user: {email, firstName, lastName}}, res) => {
    logger.info(`POST /user - creating new user where email = ${email}`);

    try {
        const existingUser = await dao.findUserByEmail(email);
        if (existingUser) {
            logger.info(`POST /user - user already exists where email = ${email}`);
            return res.sendStatus(400);
        }

        const newUser = await dao.createUser({email, firstName, lastName});

        logger.info(`POST /user - user created successfully where email = ${email}`);
        res.send(newUser);
    } catch (e) {
        logger.error(`Error creating user where email = ${email}`);
        res.sendStatus(500);
    }
});

module.exports = router;