const jwt = require('jsonwebtoken');
const routes = require('express').Router();
const user = require('../models/user');

// login route
routes.post('/login', (req, res) => {
	if (!req.body.email) {
		return res.status(404).json({
			message: 'No email Entered.'
		});
	} else {
		const userEntered = {
			email: req.body.email,
			password: req.body.password
		};

		if (user.password === userEntered.password) {
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				(err, token) => {
					res.status(200).json({ auth: true, token: token });
				}
			);
		} else {
			res
				.status(401)
				.json({ auth: false, token: null, message: 'Wrong Password!' });
		}
	}
});

routes.get('/logout', (req, res) => {
	res.status(200).send({ auth: false, token: null });
});

module.exports = routes;
