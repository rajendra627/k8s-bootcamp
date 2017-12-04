const express = require('express');

const config = require('./config');
const authMiddleware = require('./auth')(config.isTestMode);

const app = express();

app.get('/test', authMiddleware, (req, res) => {
    res.send(req.user);
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));