var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');


app.use('/',routes);






// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);