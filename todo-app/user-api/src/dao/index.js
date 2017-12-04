const mongoose = require('mongoose');

const config = require('../config');


mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbUrl, {useMongoClient: true});

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