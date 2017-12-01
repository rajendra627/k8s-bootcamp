const express = require('express');

const app = express();

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));