const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// // Load input validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// // Load User model
// const User = require('../../models/User');
const TaxUser = require('../../models/TaxUsers');
const SaleTransaction = require('../../models/SaleTransactions');
const Transaction = require('../../models/Transaction');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/add', async function(req, res)  {
	// Form validation
	await TaxUser.insertMany(req.body.users);
	res.status(200).json({req: req.body});
});

router.get('/get', async function(req, res)  {
	if (req.query.userId) {
		let user = await TaxUser.findOne({_id: req.query.userId});
		let transactions = await SaleTransaction.find({userId: req.query.userId});
		let saleTransactions = await Transaction.find({userId: req.query.userId});
		return res.status(200).json({user, transactions, saleTransactions});
	}
	let taxUsers = await TaxUser.find({});
	return res.status(200).json({taxUsers});
});


module.exports = router;
