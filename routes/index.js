var Bill = require('../models/Bill');

module.exports = function(router){


 //view   
router.get('/',(req,res) => res.sendfile('./view/index.html'));

//get information user bill
router.post('/bill/add',(req,res) =>{
    let bill = req.body;
        Bill.addBill(bill,Bill).then((Bill) => res.send(Bill),(err) => res.send(err + ''));
});

//show all bill
router.get('/bill/show',(req,res) =>{
     Bill.getAllBill(Bill).then((Bill) => res.send(Bill),(err) => res.send(err +''));
});

//remove all bill
router.get('/bill/delete-all',(req,res) =>{
    Bill.removeAll(Bill).then(() => res.send('seccessful'),(err) => res.send(err + '')); 
});

//check number phone get user
router.post('/bill/check-phone',(req,res) =>{
    Bill.getBillByPhone(req.body.phone,Bill).then((Bill) => res.send(Bill),(err) => res.send(err+ ''));       
});

//update name by id 
router.get('/bill/update',function(req,res){
    var id = req.query.id;
    var nameUP = req.query.name;
    Bill.UpdateBill(id,nameUP,Bill).then(() => res.send('update :' + nameUP + 'seccessful' ),(err) => res.send(err + ''));
});

//delete one bill by id
router.get('/bill/delete-one-bill',function(req,res){
    var id = req.query.id;
    Bill.DeleteBill(id,Bill).then(() => res.send('delete id: '+ id+' seccessful' ),(err) => res.send(err +''));

});
};