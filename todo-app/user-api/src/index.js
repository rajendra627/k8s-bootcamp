var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

require('./auth')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));