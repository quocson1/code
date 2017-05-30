var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
var db = mongoose.connection;
var unlencodeParser = bodyParser.urlencoded({extended: false});
router.get('/add',function(req,res){
	res.sendFile('index.html',{root: path.join(__dirname, '../view')});

})


db.on('error', console.error);
db.once('open', function () {
// tạo kết nối tới collection ,schemas  ,models  tại đây  --- smartjob.vn
 var receiptSchema = new mongoose.Schema({
        name: { type: String }, product: String, phone: Number
    });
    // Tạo ra  a 'Smartjob' model using the movieSchema as the structure.
    // Mongoose cũng sẽ tạo ra  1  collection smartjobs called 'Smarjob' cho documentmowis được tạo này.
    var Smartjob = mongoose.model('Smartjob', receiptSchema);
    //tao ra bang collection trong robo
    
	
	//lay thong tin tu khach hang
	router.post('/add',unlencodeParser,function(req,res){
    var thor = new Smartjob({
        name: req.body.name, product: req.body.product, phone: req.body.phone  // ở đây sử dụng string thay vì Number thì Mongoose sẽ tự convert sang Number cho bạn
        
    

    });
    thor.save(function (err, thor) {
        if (err) return console.error(err);
        console.log('seccessful');
    });
    res.redirect('/show');
 })

	//show ra tat ca du lieu
    router.get('/show', function(req,res){
    	Smartjob.find(function (err, data) {
        if (err) return console.error(err);
        res.send(data);
    });
})


// show ra tat ca du lieu thong qua so phone 
    router.get('/show/:phone', function(req,res){
    	let numberPhone = req.params.phone;
    	Smartjob.find({ phone : numberPhone},function (err, data) {
        if (err) return console.error(err);
        res.send(data);
    });
})

    //delete all data
    router.get('/remove', function(req,res){

    	 Smartjob.remove(function (err) { 	
    	 });
    	res.send('remove all database');
})

   

});
 
mongoose.connect('mongodb://localhost/data');

module.exports = router;