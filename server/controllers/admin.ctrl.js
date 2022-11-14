const {AdminModel} = require('../models/adminmodel');
// const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function createadmin(req, res) {
	const mypassword = req.body.password;
	const encpassword = await bcrypt.hash(mypassword, 10);

	try {
		const newadmin = new AdminModel({...req.body, password: encpassword, role: 'admin'});
		await newadmin.save();
		if (newadmin) {
			res.status(200).json({
				msg: 'Successfully created the admin',
				adminauthkey: newadmin.adminauthkey,
			});
		}
		else {
			res.status(404).json({
				msg: 'Admin not found...',
			});
		}
	}
	catch (e) {
		res.status(500).json({
			msg: 'Something error occured',
		});
	}
}


module.exports = {
	createadmin,
};
