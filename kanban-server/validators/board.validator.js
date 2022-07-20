const { throwError, sendError, isStrFalsy } = require('../helper');

const BOARD_NAME_EMPTY_ERR = throwError('Board name cannot be empty', 400);

exports.boardNameValidator = (req, res, next) => {
	isStrFalsy(req?.body?.board_name)
		? sendError(res, BOARD_NAME_EMPTY_ERR)
		: next();
};
