const express = require('express');
const userroute = require('./routes/user.route');
const cors = require('cors');
const connectDb = require('./db/connection');
const registerApp = async () => {
	const app = express();
	const registerRoute = (router) => app.use('/api', router);

	app.use(cors());
	app.use(express.json());
	registerRoute(userroute);

	await connectDb();

	return app;
};

module.exports = registerApp;
