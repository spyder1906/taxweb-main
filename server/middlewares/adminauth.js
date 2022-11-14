const {AdminModel} = require('../models/adminmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function AdminAuth(req, res, next) {
	try {
		const admin = await AdminModel.findOne({
			email: req.body.email,
			role: 'admin',
		});

		if (admin) {
			const mypassword = req.body.password;
			const isValidPassword = await bcrypt.compare(mypassword, admin.password);
			if (isValidPassword) {
				const accesstoken = jwt.sign({
					id: admin._id,
					name: admin.name,
					email: admin.email,
					role: 'admin',
				}, process.env.SECRETKEY, {
					expiresIn: 31556926,
				});
				req.accesstoken = accesstoken;
				next();
			}
			else {
				res.status(404).json({
					error: {
						msg: 'You are not admin',
					},
				});
			}
		}
		else {
			res.status(500).json({
				error: {
					msg: 'Email and Password is not valid',
				},
			});
		}
	}
	catch (e) {
		res.status(501).json({
			error: {
				msg: e.message,
			},
		});
	}
}

function athenticateadmin(req, res, next) {
	try {
		if (!req.headers["authorization"]) return res.status(401).json({ error: "UnAuthorized" })
		let token = req.headers.authorization;
		if (token) {
			try {
        token = req.headers["authorization"].split(" ")[1]
				const isValidToken = jwt.verify(token, process.env.SECRETKEY);
				if (isValidToken) next();
				else {
					res.status(404).json({
						msg: 'Session has been expired...',
					});
				}
			}
			catch (e) {
				console.log(e);
			}
		}
		else {
			res.status(404).json({
				msg: 'Session has been expired...',
			});
		}
	}
	catch (e) {
		res.status(500).json({
			msg: 'Session has been expired...',
		});
	}
}

module.exports = {
	AdminAuth,
	athenticateadmin,
};
