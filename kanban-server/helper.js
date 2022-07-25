const bcrypt = require('bcrypt');

const sendSuccessPayload = (res, payload, status) => {
	res.status(status).json({
		ok: true,
		payload,
	});
};

const sendError = (res, err) => {
	res.status(err.status).json({
		ok: false,
		error: {
			message: err.message,
		},
	});
};

const throwError = (message, status) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

// Bcrypt utils
const isPasswordMatching = (pwd, hash) => bcrypt.compareSync(pwd, hash);

const hashPassword = (pwd) => bcrypt.hashSync(pwd, +process.env.SALT_ROUNDS);

const isSame = (val1, val2) => val1 === val2;

const isEmpty = (val) => val?.toString().trim().length === 0;

const isFalsy = (val) => val == undefined || val == null;

const isStrFalsy = (val) => isEmpty(val) || isFalsy(val);

const sortBy = (arr, field) => {
	arr.sort((a, b) => (a[[field]] ?? 0) - (b[[field]] ?? 0));
	return arr;
};

module.exports = {
	sendSuccessPayload,
	sendError,
	throwError,
	isPasswordMatching,
	hashPassword,
	isSame,
	isStrFalsy,
	isFalsy,
	isEmpty,
	sortBy,
};
