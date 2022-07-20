const Board = require('../models/board.model');
const ERROR_RESPONSE = {
	ok: false,
};
exports.create = async function ({ board_name, board_position }, userID) {
	try {
		const newBoard = await Board.create({
			board_name,
			board_position,
			user_id: userID,
		});
		return {
			ok: true,
			board: newBoard,
		};
	} catch (err) {
		console.log(err);
		return ERROR_RESPONSE;
	}
};

exports.update = async function (id, board_data, userID) {
	try {
		const updatedData = await Board.updateOne(
			{ _id: id, user_id: userID },
			{ ...board_data, user_id: userID },
		);
		if (updatedData.modifiedCount > 0) {
			return { ok: true, message: 'Updated successfully' };
		}
		return ERROR_RESPONSE;
	} catch (err) {
		return ERROR_RESPONSE;
	}
};
