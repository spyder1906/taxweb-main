const express = require('express');
const {createadmin} = require('../../controllers/admin.ctrl');
const {AdminAuth, athenticateadmin} = require('../../middlewares/adminauth');
const adminrouter = express.Router();
const {checkValid, validation} = require('../../validation/adminvalidation');

adminrouter.post('/makeadmin', checkValid, validation, createadmin);

adminrouter.post('/authenticate', AdminAuth, (req, res) => {
	const token = req.accesstoken;
	res.status(200).json({
		msg: 'This is auth',
		accesstoken: 'Bearer ' + token,
		refreshtoken: 'Bearer ' + req.refreshtoken,
	});
});

adminrouter.post('/user', athenticateadmin, (req, res) => {
	res.status(200).json({
		msg: 'This is auth',
	});
});

module.exports = adminrouter;
