const { throwError, sendError, isStrFalsy } = require('../helper');

const TASK_EMPTY_ERR = throwError('Task name cannot be empty', 400);
const BOARD_ID_EMPTY_ERR = throwError('Board ID cannot be empty', 400);

const taskNameValidator = (req, res, next) => {
	isStrFalsy(req?.body?.task_item) ? sendError(res, TASK_EMPTY_ERR) : next();
};

const boardIdValidator = (req, res, next) => {
	isStrFalsy(req?.body?.board_id)
		? sendError(res, BOARD_ID_EMPTY_ERR)
		: next();
};

const taskAndBoardValidator = [taskNameValidator, boardIdValidator];

module.exports = {
	validateTasks: taskAndBoardValidator,
};
