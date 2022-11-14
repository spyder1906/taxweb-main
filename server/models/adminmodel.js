const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
	email: {
		type: String,
	},
	name: {
		type: String,
	},
	password: {
		type: String,
	},
	role: {
		type: String,
		default: 'admin',
	},
	timestamp: {
		type: Date,
		default: Date.now(),
	},

});

const AdminModel = mongoose.model('admins', adminschema);

module.exports = {
	AdminModel,
};
