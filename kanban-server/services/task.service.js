const { Task } = require('../models/task.model');
const SharedService = require('../services/shared.service');
const ProjectService = require('./project.service');

const ERROR_RESPONSE = {
	ok: false,
};
exports.create = async function ({ task_item, board_id, project_id }, userID) {
	const projectOwner = await ProjectService.isProjectOwnerService(project_id, userID);
	const boardOwner = await SharedService.isBoardOwner(userID, board_id);
	if (!projectOwner || !boardOwner) return ERROR_RESPONSE;
	try {
		const taskCount = await Task.find({
			board_id,
			user_id: userID,
		}).count();
		const newTask = await Task.create({
			task_item,
			board_id,
			task_position: taskCount > 0 ? taskCount : 0,
			user_id: userID,
			project_id,
		});
		return {
			ok: true,
			task: newTask,
		};
	} catch (error) {
		console.log(error);
		return ERROR_RESPONSE;
	}
};
