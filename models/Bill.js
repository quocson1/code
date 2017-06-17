var mongoose = require('mongoose');

//bill Schema
var receiptSchema = new mongoose.Schema({
	time:{type: Number, default:Number((new Date()).getHours())},
    name: { type: String }, product: String, phone: Number,
    number: Number,  date: { type: String, default: (new Date()).getDate() + '-' + ((new Date()).getMonth()+1) +'-'+(new Date()).getFullYear() }},{
    versionKey: false

    });
//});

var reportSchema = new mongoose.Schema({
	_id: Number,
	 name: { type: String }, product: String, phone: Number,
    number: Number,  time: Number , date: String}, {
    	versionKey: false
    });
//})

var Bill = module.exports = mongoose.model('Bill',receiptSchema);
var report = module.exports = mongoose.model('report',reportSchema);


//get all bill
module.exports.getAllBill = function(limit){
	return new Promise((resolve,reject)=>{
		//if = ?? ...
		// if(){
		// 	return reject(new Error('khong co du lieu' ));
		// }
		resolve(Bill.find(limit));

	});
};


//get bill by phone
module.exports.getBillByPhone = (xphone,limit) =>{
	return new Promise((resolve,reject) => {
		resolve(Bill.find({phone:xphone},limit))
	});
};

//add bill new 
module.exports.addBill= (bill,limit) =>{
	return new Promise((resolve,resject) => {
		resolve(Bill.create(bill,limit))
	});
};

//remove all bill 
module.exports.removeAll = (limit) =>{
	return new Promise((resolve, resject) => {
		resolve(Bill.remove(limit))
	});
};


//update name by id 
module.exports.UpdateBill = function(id,bill){
	return new Promise((resolve,resject) =>{

		let query = {_id:id};
		let update = {
			name:bill
		}
		resolve(Bill.update(query,update));
	});
};


//delete one bill
module.exports.DeleteOneBill = function(id){
	return new Promise((resolve,resject) =>{
		let query ={_id:id};
		resolve(Bill.remove(query));
	});
}



// thống kê số lượng sum sản phẩm
module.exports.StatisticsNumberProducts = (time) =>{
	return new Promise((resolve,reject) =>{
		//  let D = new Date();
		//  let timeNow = Number(D.getHours());
		// if(timeNow == time){
		resolve(Bill.aggregate([
			{$match: {time:time}},
			{$group:{
				_id: "$product",
				soluong: {$sum: "$number"}
			}},
			{$sort : {soluong: -1,_id: 1}}
			]))
	}
	)

};

//inserts report
module.exports.inserts =(id,product,number,time,date,limit) =>{
	return new Promise((resolve,reject) =>{
		resolve(new report({
			_id:id,
			product:product,
			number:number,
			time:time,
			date:date
		}).save(limit))
	})
};