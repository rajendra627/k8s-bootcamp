const mongoose = require('mongoose');

const {mongoDbUrl} = require('../config');
const logger = require('../logger');


mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUrl, {useMongoClient: true});

const connection = mongoose.connection;
connection.once('open', () => logger.info(`Connected successfully - ${mongoDbUrl}`));
connection.on('error', () => logger.error(`Error connecting - ${mongoDbUrl}`));

const User = require('./models/user')();

const createUser = async ({email, firstName, lastName}) => {
    return await new User({email, firstName, lastName}).save();
};

const findUserByEmail = async email => {
    return await User.findOne({email});
};

module.exports = {
    createUser,
    findUserByEmail
};