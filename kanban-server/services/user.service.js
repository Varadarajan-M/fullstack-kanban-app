const jwt = require('jsonwebtoken');
const {
	hashPassword,
	isSame,
	isStrFalsy,
	isPasswordMatching,
} = require('../helper');
const User = require('../models/user.model');
const ERROR_RESPONSE = {
	ok: false,
};

exports.register = async ({ email, password, username }) => {
	try {
		const user = await User.findOne({ email });
		if (isSame(user?.email, email)) {
			return ERROR_RESPONSE;
		}
		password = hashPassword(password);
		const dbResponse = await User.create({
			email,
			password,
			username,
		});
		return { ok: true, user: dbResponse };
	} catch (e) {
		return ERROR_RESPONSE;
	}
};

exports.login = async ({ email, password }) => {
	try {
		const user = await User.findOne({ email }).lean();
		const userExistsAndPasswordMatches =
			!isStrFalsy(user?.email) &&
			isPasswordMatching(password, user?.password);

		if (userExistsAndPasswordMatches) {
			const token = jwt.sign(
				{ userID: user._id, email: user.email },
				process.env.SECRET,
				{ expiresIn: '30m' },
			);
			return {
				ok: true,
				user: {
					email: user.email,
					token: token,
					username: user.username,
				},
			};
		}
		return ERROR_RESPONSE;
	} catch (e) {
		return ERROR_RESPONSE;
	}
};
