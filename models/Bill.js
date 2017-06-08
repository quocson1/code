var mongoose = require('mongoose');

//bill Schema
var receiptSchema = new mongoose.Schema({
    name: { type: String }, product: String, phone: Number,number: Number, date:{type:Date, default:Date.now()}
});



var Bill = module.exports = mongoose.model('Bill',receiptSchema);

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
	return new Promise((resolve,reject) => resolve(Bill.find({phone:xphone},limit)));
};

//add bill new 
module.exports.addBill= (bill,limit) =>{
	return new Promise((resolve,resject) => resolve(Bill.create(bill,limit)));
};

//remove all bill 
module.exports.removeAll = (limit) =>{
	return new Promise((resolve, resject) => resolve(Bill.remove(limit)));
};

//update name by id 
module.exports.UpdateBill = function(id,bill,limit){
	return new Promise((resolve,resject) =>{
		let query = {_id:id};
		let update = {
			name:bill
		}
		resolve(Bill.update(query,update,limit));
	});
};


//delete one bill
module.exports.DeleteBill = function(id,limit){
	return new Promise((resolve,resject) =>{
		let query ={_id:id};
		resolve(Bill.remove(query,limit));
	});
}




