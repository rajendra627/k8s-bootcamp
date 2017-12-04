const express = require('express');

const logger = require('./logger');


const app = express();
app.use('/api/user', require('./controller'));

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));