const { sendSuccessPayload, throwError, sendError } = require('../helper');
const SharedService = require('../services/shared.service');

exports.getBoardData = async function (req, res, next) {
	const boardData = await SharedService.getBoardData(req?.user?.userID);
	if (boardData.ok) {
		sendSuccessPayload(res, boardData?.boardData, 200);
	} else {
		sendError(res, throwError('Something went wrong', 400));
	}
};

exports.bulkUpdateTasks = async (req, res) => {
	const updatedData = await SharedService.bulkUpdateTasks(
		req?.body?.tasks,
		req?.body?.deletedStack ?? {},
		req?.user?.userID,
	);
	if (updatedData.ok) {
		sendSuccessPayload(res, updatedData.message, 200);
	} else {
		sendError(res, throwError('Something went wrong', 400));
	}
};
