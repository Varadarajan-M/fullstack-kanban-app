const { Task } = require('../models/task.model');
const SharedService = require('../services/shared.service');
const ERROR_RESPONSE = {
	ok: false,
};
exports.create = async function ({ task_item, board_id }, userID) {
	try {
		const isBoardOwner = await SharedService.isBoardOwner(userID, board_id);
		if (!isBoardOwner) return ERROR_RESPONSE;
		const newTask = await Task.create({
			task_item,
			board_id,
			user_id: userID,
		});
		return {
			ok: true,
			task: newTask,
		};
	} catch (error) {
		return ERROR_RESPONSE;
	}
};
