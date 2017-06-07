var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// shoulde rename index to anthor
const index = require('./routes/index') (router);
// appled promise
const indexPromise = require('./routes/index-promise') (router);

app.use(bodyParser.urlencoded({extended: false}));


// use router
app.use('/', index);
app.use('/promise', indexPromise);


// Listen
var port = process.env.PORT || 3000;

//connect data mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data', function(error) {
  if(error) {
    console.log('Connecting to mongodb failure!');
  }
  // start server
  app.listen(port);
  console.log('Listening on localhost:'+ port);
});
