const jwt = require('jsonwebtoken');
const { isStrFalsy, throwError, sendError } = require('../helper');

const isAuthenticated = async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization.split(' ')[1];
	const authErr = throwError('Authentication Failed', 404);

	if (isStrFalsy(token)) {
		sendError(res, authErr);
	} else {
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				sendError(res, authErr);
			} else {
				req.user = user;
				next();
			}
		});
	}
};

module.exports = isAuthenticated;
