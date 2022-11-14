const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SaleTransactionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	reference: {
		type: String,
		required: true,
	},
	referenceId: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.ObjectId,
		required: true,
	},
	finalValue: {
		type: Number,
		required: true,
	},
	date: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	sign: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// eslint-disable-next-line no-undef
module.exports = SaleTransaction = mongoose.model('saleTransactions', SaleTransactionSchema);
