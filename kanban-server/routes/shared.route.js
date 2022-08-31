const express = require('express');
const { isProduction } = require('../helper');
const Board = require('../models/board.model');
const Project = require('../models/project.model');
const { Task } = require('../models/task.model');

const User = require('../models/user.model');
const router = express.Router();

router.use('/shared', router);

// *IMPORTANT NOTE The below routes are used for adding project ids to all the boards and tasks
// *without breaking the existing db configurations

if (!isProduction()) {
	router.get('/create-projects', async (req, res) => {
		const users = await User.find().lean();
		let projects = [];
		for (const user of users) {
			const project = await Project.create({
				user_id: user._id,
			});
			projects.push(project);
		}
		res.send({ projects: projects });
	});

	router.get('/map-boards-to-projects', async (req, res) => {
		const users = await User.find().lean();
		for (let user of users) {
			const project = await Project.findOne({ user_id: user._id });
			await Board.updateMany(
				{ user_id: user._id },
				{
					project_id: project._id,
				},
			);
		}
		res.send({
			ok: true,
		});
	});

	router.get('/map-tasks-to-projects', async (req, res) => {
		const users = await User.find().lean();
		for (let user of users) {
			const project = await Project.findOne({ user_id: user._id });
			await Task.updateMany(
				{ user_id: user._id },
				{
					project_id: project._id,
				},
			);
		}
		res.send({
			ok: true,
		});
	});
}

module.exports = router;
