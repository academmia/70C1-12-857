const jwt = require('jsonwebtoken');

// middleware for authorization
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		
		jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
			if (err) {
				res.status(403).json({ message: 'Not Authorized - Token invalid!' });
			  } else {
				  next(); 
			  }
		});

	} else {
		// forbidden
		res.status(403).json({ message: 'Not Authorized!' });
	}
}

module.exports = verifyToken;
