const mongoose = require('mongoose');
const { isProduction } = require('../helper');

const connectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connectDb = async function () {
	const MONGO_URI = isProduction() ? process.env.MONGO_URI : process.env.MONGO_URI_DEV;
	mongoose.connect(MONGO_URI, connectionOptions, (err) => {
		if (err) {
			console.log('Something went wrong', err);
		}
	});

	mongoose.connection.on('connected', () => {
		console.log('Connected to Database');
	});
};

module.exports = connectDb;
