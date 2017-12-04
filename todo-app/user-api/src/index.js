const express = require('express');


const app = express();
app.use('/api/user', require('./controller'));

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));