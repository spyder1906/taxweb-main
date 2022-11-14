const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.ObjectId,
		required: true,
	},
	finalAmount: {
		type: Number,
		required: true,
	},
	commision: {
		type: Number,
		required: true,
	},
	commisionType: {
		type: String,
		required: true,
	},
	acNo: {
		type: Number,
		required: true,
	},
	finalType: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	amountType: {
		type: String,
		required: true,
	},
	commision1: {
		type: Number,
		required: true,
	},
	commision2: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	sign: {
		type: String,
		required: true,
	},
	Date: {
		type: Date,
		default: Date.now,
	},
});

// eslint-disable-next-line no-undef
module.exports = Transaction = mongoose.model('transactions', TransactionSchema);
