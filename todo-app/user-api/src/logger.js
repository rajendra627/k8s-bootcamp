const winston = require('winston');
const {File, Console} = winston.transports;

const config = require('./config');


const logger = new winston.Logger({
    level: config.logLevel,
    transports: [
        new File({
            filename: './server.log',
            handleExceptions: true,
            json: false
        }),
        new Console({
            handleExceptions: true,
            json: true,
            stringify: true
        })
    ]
});

module.exports = logger;