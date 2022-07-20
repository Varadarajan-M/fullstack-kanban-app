const TaskService = require('../services/task.service');
const { sendSuccessPayload, throwError, sendError } = require('../helper');

exports.create = async (req, res) => {
	const newTask = await TaskService.create(req.body, req?.user?.userID);
	if (newTask.ok) {
		sendSuccessPayload(res, newTask.task, 200);
	} else {
		const CANNOT_CREATE_TASK_ERR = throwError('Cannot create task', 400);
		sendError(res, CANNOT_CREATE_TASK_ERR);
	}
};
