const { throwError, sendError, isStrFalsy } = require('../helper');
const EMAIL_REGEX =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const WEAK_PASSWORD_ERR = throwError('Weak password', 400);
const INVALID_EMAIL_ERR = throwError('Invalid Email', 400);
const USERNAME_EMPTY_ERR = throwError('Username cannot be empty', 400);

const emailValidator = (req, res, next) => {
	EMAIL_REGEX.test(req?.body?.email)
		? next()
		: sendError(res, INVALID_EMAIL_ERR);
};

const passwordValidator = (req, res, next) => {
	const isPasswordLong = req?.body?.password.length > 8;
	isPasswordLong ? next() : sendError(res, WEAK_PASSWORD_ERR);
};

const usernameValidator = (req, res, next) => {
	const isValidUserName = !isStrFalsy(req?.body?.username);
	isValidUserName ? next() : sendError(res, USERNAME_EMPTY_ERR);
};

const registerValidator = [
	emailValidator,
	passwordValidator,
	usernameValidator,
];

module.exports = { register: registerValidator, login: emailValidator };
