module.exports = {
    isTestMode: process.env.IS_TEST_MODE,
    mongoDbUrl: process.env.MONGODB_URL,
    logLevel: process.env.LOG_LEVEL || 'info'
};