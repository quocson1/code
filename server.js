var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

require('./routes/index') (router);

app.use(bodyParser.urlencoded({extended: false}));

//connect data mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data');

app.use(router); 

// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);