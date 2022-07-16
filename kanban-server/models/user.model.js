const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
	},
	{ timeStamps: true },
);

const User = mongoose.model('Users', UserSchema);

module.exports = User;
