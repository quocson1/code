var Bill = require('../models/Bill');
var report = require('../models/Bill');

module.exports = function(router){
//get report by date and hour 
router.get('/report',(req,res) =>{
    let times = req.query.time;
    let days = req.query.date;
    report.getReportByDateAndTime(days,times,report).then((Bill) => 
        res.send(Bill),
        (err) => res.send(err+ ''));     
    //res.send(day);  
});

 //view   
 router.get('/',(req,res) => {
    res.sendfile('./view/index.html')
});

//add bill 
router.post('/bill/add',(req,res) =>{
    let bill = req.body;
    console.log(bill);
    Bill.addBill(bill,Bill).then((Bill) => 
        res.send(Bill),
        (err) => res.send(err + ''));
});

//show all bill
router.get('/bill/show',(req,res) =>{
   Bill.getAllBill(Bill).then((Bill) => 
    res.send(Bill),
    (err) => res.send(err +''));
});

//remove all bill
router.get('/bill/delete-all',(req,res) =>{
    Bill.removeAll(Bill).then(() => 
        res.send('seccessful'),
        (err) => res.send(err + '')); 
});

//check number phone get user
router.post('/bill/check-phone',(req,res) =>{
    Bill.getBillByPhone(req.body.phone,Bill).then((Bill) => 
        res.send(Bill),
        (err) => res.send(err+ ''));       
});

//update name by id 
router.get('/bill/update',function(req,res){
    let id = req.query.id;
    let nameUP = req.query.name;
    Bill.UpdateBill(id,nameUP,Bill).then(() => 
        res.send('update seccessful' ),
        (err) => res.send(err + ''));
});

//delete one bill by id
router.get('/bill/delete-one-bill',function(req,res){
    let id = req.query.id;
    Bill.DeleteOneBill(id).then(() => 
        res.send('delete id: '+ id+' seccessful' ),
        (err) => res.send(err +''));

});
};