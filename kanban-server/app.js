const express = require('express');
const userroute = require('./routes/user.route');
const taskroute = require('./routes/task.route');
const boardroute = require('./routes/board.route');
const projectRoute = require('./routes/project.route');
const sharedRoute = require('./routes/shared.route');
const cors = require('cors');
const helmet = require('helmet');
const connectDb = require('./db/connection');
const path = require('path');

const registerApp = async () => {
	const app = express();
	const registerRoute = (router) => app.use('/api', router);

	app.use(cors());

	app.use(helmet());
	app.use(express.json());

	registerRoute(userroute);
	registerRoute(projectRoute);
	registerRoute(boardroute);
	registerRoute(taskroute);
	registerRoute(sharedRoute);

	const __dirname1 = path.resolve();

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname1, '/kanban-app/dist')));
		app.get('*', (req, res) => res.sendFile(path.resolve(__dirname1, 'kanban-app', 'dist', 'index.html')));
	} else {
		app.get('/', (req, res) => {
			res.send('API is running..');
		});
	}

	await connectDb();

	return app;
};

module.exports = registerApp;
