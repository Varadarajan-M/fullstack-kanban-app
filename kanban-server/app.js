const express = require('express');
const userroute = require('./routes/user.route');
const taskroute = require('./routes/task.route');
const boardroute = require('./routes/board.route');
const sharedRoute = require('./routes/shared.route');
const cors = require('cors');
const connectDb = require('./db/connection');
const registerApp = async () => {
	const app = express();
	const registerRoute = (router) => app.use('/api', router);

	app.use(cors());
	app.use(express.json());

	registerRoute(userroute);
	registerRoute(boardroute);
	registerRoute(taskroute);
	registerRoute(sharedRoute);

	await connectDb();

	return app;
};

module.exports = registerApp;
