var Bill = require('../models/Bill');
var report = require('../models/Bill');
const cron = require('node-cron');


module.exports = function(router){


    //runs every hour
     cron.schedule('0 0 * * * *', function () {
        let time = null;
        let D = new Date();
        let timeNow = Number(D.getHours());
        //Update the reports with time == null to the current time
        report.UpdateTime(time,timeNow).then(() => 
            console.log('update seccessful' ),
            (err) => console.log(err + ''))
        console.log('running a task every hour');
 });


 //view   
router.get('/',(req,res) => {
    res.sendfile('./view/index.html')
});

//add bill 
router.post('/bill/add',(req,res) =>{
    let bill = req.body;
        Bill.addBill(bill,Bill).then((Bill) =>{ 
            res.send(Bill);
            var addrport = {
                product: Bill.product,
                number: Bill.number,
                time: null
            }
            // Save data to report every time someone purchases with time = null;
            report.addReport(addrport,report).then((report) => 
                console.log('add report to user seccessful'),
                (err)=> console.log(err+''));
        },(err) => res.send(err + ''));
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
    var id = req.query.id;
    var nameUP = req.query.name;
    Bill.UpdateBill(id,nameUP,Bill).then(() => 
        res.send('update seccessful' ),
        (err) => res.send(err + ''));
});

//delete one bill by id
router.get('/bill/delete-one-bill',function(req,res){
    var id = req.query.id;
    Bill.DeleteOneBill(id).then(() => 
        res.send('delete id: '+ id+' seccessful' ),
        (err) => res.send(err +''));

});
};