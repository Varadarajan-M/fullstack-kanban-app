const jwt = require('jsonwebtoken');
const { isStrFalsy, throwError, sendError } = require('../helper');

const verifyAuth = async (req, res, next) => {
	const token = req.headers?.authorization?.split(' ')[1];
	const authErr = throwError('Authentication Failed', 404);

	if (isStrFalsy(token)) {
		sendError(res, authErr);
	} else {
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				sendError(res, authErr);
			} else {
				req.user = Object.freeze(user);
				next();
			}
		});
	}
};

module.exports = verifyAuth;
