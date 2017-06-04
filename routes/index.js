var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
 //connection toi mongo
var db = mongoose.connection;
//de lay gia tri trong body index.html
var unlencodeParser = bodyParser.urlencoded({extended: false});
router.get('/',function(req,res){
	res.sendFile('index.html',{root: path.join(__dirname, '../view')});

})


db.on('error', console.error);
db.once('open', function () {
// tạo kết nối tới collection ,schemas  ,models  tại đây  
 var receiptSchema = new mongoose.Schema({
        name: { type: String }, product: String, phone: Number,number: Number
    });
    // Tạo ra  a 'Smartjob' model using the movieSchema as the structure.
    // Mongoose cũng sẽ tạo ra  1  collection smartjobs called 'Smarjob' cho documentmowis được tạo này.
    var Smartjob = mongoose.model('Smartjob', receiptSchema);
    //tao ra bang collection trong robo

	//add khach hang
	router.post('/add',unlencodeParser,function(req,res){
    var thor = new Smartjob({
        name: req.body.name, product: req.body.product, phone: req.body.phone  ,number: req.body.number
    });
    thor.save(function (err, thor) {
        if (err) return console.error(err);
        console.log('seccessful');
    });
    res.send('Đã Thêm Thành Công');
    //res.redirect('/show');
 })

	//show ra tat ca du lieu
    router.get('/show', function(req,res){
    	Smartjob.find(function (err, Smartjob) {
        if (err) return console.error(err);
        res.send(Smartjob);
    });
})


//update thong tin
 router.get('/update', function(req,res){
   
     Smartjob.update({_id:req.query.id},{name:req.query.name},function (err,Smartjob) {
             if (err) return console.error(err);
        res.send('update seccessful');
        })
        
    })


// check customer information to numberphone
    router.post('/checkphone',unlencodeParser, function(req,res){
    	//let xnumberPhone = req.params.phone;
       console.log(req.body.phone) ;//
    	Smartjob.find({ phone : req.body.phone},function (err, Smartjob) {
        if (err) return console.error(err);
       // let oj = Smartjob;
       // console.log(oj[0].name);
        res.send(Smartjob);
    });
})

    //delete thong qua id ,
    router.post('/remove',unlencodeParser, function(req,res){

    	 Smartjob.remove({_id: req.body.id},function (err,Smartjob) { 	
    	 });
    	res.send('da xoá id:'+ req.body.id);
})

    //delete all database
    router.get('/remove/all', function(req,res){

         Smartjob.remove(function (err,Smartjob) {     
         });
        res.send('da xoa thanh cong ');
})

});
 
mongoose.connect('mongodb://localhost/data');

module.exports = router;