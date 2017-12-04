const mongoose = require('mongoose');

const config = require('../config');


mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbUrl, {useMongoClient: true});

const createUser = async ({email, firstName, lastName}) => {
    const User = require('./models/user')();
    return await new User({email, firstName, lastName}).save();
};

const findUserByEmail = async email => {
    const User = require('./models/user')();
    return await User.findOne({email});
};

module.exports = {
    createUser,
    findUserByEmail
};