var mongoose = require('mongoose');

//bill Schema
var receiptSchema = new mongoose.Schema({
    name: { type: String }, product: String, phone: Number,number: Number, date:{type:Date, default:Date.now()}
});



var Bill = module.exports = mongoose.model('Bill',receiptSchema);

//get all bill
module.exports.getAllBill = function(callback,limit){
	Bill.find(callback).limit(limit);
}

//get bill by phone
module.exports.getBillByPhone = function(xphone,limit){
	Bill.find({phone:xphone},limit);
}

//add bill new 
module.exports.addBill= function(bill,limit){
	Bill.create(bill,limit);
}

//remove all bill 
module.exports.removeAll = function(limit){
	Bill.remove(limit);
}

//update name by id 
module.exports.UpdateBill = function(id,bill,options,limit){
	var query = {_id:id};
	var update = {
		name:bill
	}
	Bill.update(query,update,options,limit);
}


//delete one bill
module.exports.DeleteBill = function(id,limit){
	var query = {_id:id};
	Bill.remove(query,limit);
}




