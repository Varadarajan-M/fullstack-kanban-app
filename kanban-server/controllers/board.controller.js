const BoardService = require('../services/board.service');
const { sendSuccessPayload, throwError, sendError } = require('../helper');

exports.create = async (req, res) => {
	const newBoard = await BoardService.create(req.body, req?.user?.userID);
	if (newBoard.ok) {
		sendSuccessPayload(res, newBoard.board, 200);
	} else {
		const CANNOT_CREATE_BOARD_ERR = throwError('Cannot create board', 400);
		sendError(res, CANNOT_CREATE_BOARD_ERR);
	}
};

exports.update = async (req, res) => {
	const isBoardUpdated = await BoardService.update(
		req?.params?.id ?? -1,
		req.body ?? {},
		req?.user?.userID,
	);
	if (isBoardUpdated?.ok) {
		sendSuccessPayload(res, isBoardUpdated.message, 200);
	} else {
		const CANNOT_UPDATE_BOARD_ERR = throwError('Cannot update board', 400);
		sendError(res, CANNOT_UPDATE_BOARD_ERR);
	}
};
