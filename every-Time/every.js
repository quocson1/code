var every = require('every-moment');
var Bill = require('../models/Bill');
var report = require('../models/Bill');
let D = new Date();
module.exports = function(router){
    let timeNow = (Number(D.getHours()))-1;
    let dateNow = String(D.getDate() + '/'+(D.getMonth()+1) +'/'+D.getFullYear());
    every(1,'hour',()=>{
        Bill.StatisticsNumberProducts(timeNow).then((bill) => {
            for(let i in bill){
                report.inserts(i,bill[i]._id,bill[i].soluong,timeNow,dateNow);
            }
        },(err) => console.log(err + ''))
         console.log('running a task every hour');
    });
}