const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema({
	account: { type: String, default: null },
	blockHash: { type: String },
	from: { type: String },
	gas: { type: Number },
	blockNumber: { type: Number },
	hash: { type: String },
	gasPrice: { type: String },
	input: { type: String },
	nonce: { type: Number },
	to: { type: String },
	v: { type: String },
	r: { type: String },
	transactionIndex: { type: Number },
	s: { type: String },
	value: { type: String },
});

const Transfer = mongoose.model('transfer', TransferSchema);

module.exports = Transfer;
