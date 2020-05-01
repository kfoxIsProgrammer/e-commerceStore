var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	productID: {type: Number, required: true},
	imagePath: {type: String, required: true},
	majorTitle: {type: String, required: true},
	minorTitle: {type: String, required: true},
	price: {type: Number, required: true},
	isHot: {type: Boolean, require: true},
	isBest: {type: Boolean, require: true}
	});


module.exports = mongoose.model('Product', schema);