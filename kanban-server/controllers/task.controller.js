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

exports.update = async (req, res) => {
	const isTaskUpdated = await TaskService.update(
		req?.params?.id ?? -1,
		req.body ?? {},
		req?.user?.userID,
	);
	if (isTaskUpdated?.ok) {
		sendSuccessPayload(res, isTaskUpdated.message, 200);
	} else {
		const CANNOT_UPDATE_TASK_ERR = throwError('Cannot update task', 400);
		sendError(res, CANNOT_UPDATE_TASK_ERR);
	}
};

exports.delete = async (req, res) => {
	const deletedData = await TaskService.delete(
		req.params?.id,
		req?.user?.userID,
	);
	if (deletedData.ok) {
		sendSuccessPayload(res, deletedData.message, 200);
	} else {
		const CANNOT_DELETE_TASK_ERR = throwError('Cannot delete task', 400);
		sendError(res, CANNOT_DELETE_TASK_ERR);
	}
};
