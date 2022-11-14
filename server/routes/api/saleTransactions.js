const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// // Load input validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

// // Load User model
// const User = require('../../models/User');
const SaleTransaction = require('../../models/SaleTransactions');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/add', async function(req, res)  {
	// Form validation
	let data = req.body.transactions.map(t => {
		return {...t, date: new Date(t.date)};
	});
	await SaleTransaction.insertMany(data);
	res.status(200).json({req: data});
});

router.get('/get', async function(req, res)  {
	let transactions = await SaleTransaction.find({});
	res.status(200).json({transactions});
});

module.exports = router;
