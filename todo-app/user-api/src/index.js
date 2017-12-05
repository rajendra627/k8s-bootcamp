const express = require('express');
const cors = require('cors');

const logger = require('./logger');


const app = express();
app.use(cors());
app.use('/api/user', require('./controller'));

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));