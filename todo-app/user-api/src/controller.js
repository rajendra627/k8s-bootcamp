const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const config = require('./config');
const authMiddleware = require('./auth')(config.isTestMode);

const dao = require('./dao');
const logger = require('./logger');


const findUserByEmail = async (email, res) => {
    logger.info(`GET /user - where email = ${email}`);

    try {
        const user = await dao.findUserByEmail(email);
        if (!user) {
            logger.info(`GET /user - user not found where email = ${email}`);
            return res.sendStatus(HttpStatus.NOT_FOUND);
        }

        logger.info(`GET /user - user found where email = ${email}`);
        res.send(user);
    } catch (e) {
        logger.error(`Error getting user where email = ${email}`);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
};

router.get('/:email', async ({params: {email}}, res) => {
    findUserByEmail(email, res);
});

router.get('/', authMiddleware, async ({user: {email}}, res) => {
    findUserByEmail(email, res);
});

router.post('/', authMiddleware, async ({user: {email, firstName, lastName}}, res) => {
    logger.info(`POST /user - creating new user where email = ${email}`);

    try {
        const existingUser = await dao.findUserByEmail(email);
        if (existingUser) {
            logger.info(`POST /user - user already exists where email = ${email}`);
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        const newUser = await dao.createUser({email, firstName, lastName});

        logger.info(`POST /user - user created successfully where email = ${email}`);
        res.status(HttpStatus.CREATED).send(newUser);
    } catch (e) {
        logger.error(`Error creating user where email = ${email}`);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;