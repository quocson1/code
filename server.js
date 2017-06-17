const express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cron = require('node-cron');
const router = express.Router();


//shoulde rename index to anthor
const index = require('./routes/index') (router);
// appled promise
//const indexPromise = require('./routes/index-promise') (router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//use router
app.use('/',(router));

//app.use('promise',router);


// Listen
var port = process.env.PORT || 3000;

//connect data mongodb
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/data',function(err){
	if(err){
		console.log('connecting to mongodb failure!');
	}
	//start server
	app.listen(port);
	console.log('Listening on localhost:'+ port);
});
