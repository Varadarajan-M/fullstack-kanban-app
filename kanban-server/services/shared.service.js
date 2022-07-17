const Board = require('../models/board.model');
const { Task } = require('../models/task.model');
const ERROR_RESPONSE = {
	ok: false,
};

exports.getBoardData = async function (id) {
	try {
		const boardData = await Board.find({ user_id: id }).sort({
			board_position: 1,
			createdAt: 1,
		});
		boardData.forEach((board) => {
			board?.tasks.sort((a, b) => a?.task_position - b?.task_position);
		});
		return {
			ok: true,
			boards: boardData,
		};
	} catch (e) {
		return ERROR_RESPONSE;
	}
};

exports.bulkUpdateTasks = async function (tasks, userID) {
	try {
		let updatedData = {};
		let updatedCount = 0;
		// !Here update is not implemented parallely
		// !because the mongoose middleware was failing to update all.
		for await (const task of tasks) {
			updatedData = await Task.updateOne(
				{ _id: task._id, user_id: userID },
				{ ...task, user_id: userID },
			);
			updatedCount += +updatedData?.modifiedCount ?? 0;
		}
		if (updatedCount === tasks.length) {
			return { ok: true, message: 'Tasks updated successfully' };
		}
		return ERROR_RESPONSE;
	} catch (error) {
		return ERROR_RESPONSE;
	}
};
