var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bill = require('../models/Bill')
//connection toi mongo
var db = mongoose.connection;

//de lay gia tri trong body index.html
var unlencodeParser = bodyParser.urlencoded({extended: false});
router.get('/',function(req,res){
    res.sendFile('index.html',{root: path.join(__dirname, '../view')});

})

//get information user buyer
router.post('/bill/add',unlencodeParser,function(req,res){
    var bill = req.body;
    Bill.addBill(bill,function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);
    });
});

//show all bill
router.get('/bill/show',function(req,res){
    Bill.getAllBill(function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);

    })

})

//remove all bill
router.get('/bill/delete-all',function(req,res){
    Bill.removeAll(function(err,Bill){
        if(err){
            throw err;
        }
        res.send('remove all seccessful');

    })
})

//check number phone get user
router.post('/bill/check-phone',unlencodeParser,function(req,res){
    console.log(req.body.phone);
    Bill.getBillByPhone(req.body.phone,function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);

    })

})


//update name by id 
router.get('/bill/update',function(req,res){
    var id = req.query.id;
    var nameUP = req.query.name;
    Bill.UpdateBill(id,nameUP,function(err,Bill){
        if(err){
            throw err;
        }
        res.send('update seccessful');

    })

})

//delete one bill by id
router.get('/bill/delete-one-bill',function(req,res){
    var id = req.query.id;
    Bill.DeleteBill(id,function(err,Bill){
        if(err){
            throw err;
        }
        res.send('delete id: '+ id+' seccessful');

    })

})




mongoose.connect('mongodb://localhost/data');

module.exports = router;