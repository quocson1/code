var Bill = require('../models/Bill');

module.exports = function(app){
//view
app.get('/',function(req,res){
    res.sendfile('./view/index.html');
});

//get information user buyer
app.post('/bill/add',function(req,res){
    var bill = req.body;
    Bill.addBill(bill,function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);
    });
});

//show all bill
app.get('/bill/show',function(req,res){
    Bill.getAllBill(function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);

    })

})

//remove all bill
app.get('/bill/delete-all',function(req,res){
    Bill.removeAll(function(err,Bill){
        if(err){
            throw err;
        }
        res.send('remove all seccessful');

    })
})

//check number phone get user
app.post('/bill/check-phone',function(req,res){
    console.log(req.body.phone);
    Bill.getBillByPhone(req.body.phone,function(err,Bill){
        if(err){
            throw err;
        }
        res.send(Bill);

    })

})


//update name by id 
app.get('/bill/update',function(req,res){
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
app.get('/bill/delete-one-bill',function(req,res){
    var id = req.query.id;
    Bill.DeleteBill(id,function(err,Bill){
        if(err){
            throw err;
        }
        res.send('delete id: '+ id+' seccessful');

    })

})

};
