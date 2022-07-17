const { Task } = require('../models/task.model');
const ERROR_RESPONSE = {
	ok: false,
};
exports.create = async function ({ task_item, board_id }, userID) {
	try {
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

exports.update = async function (id, task, userID) {
	try {
		const updatedData = await Task.updateOne(
			{ _id: id, user_id: userID },
			{ ...task, user_id: userID },
		);
		if (updatedData.modifiedCount > 0) {
			return { ok: true, message: 'Updated successfully' };
		}
		return ERROR_RESPONSE;
	} catch (err) {
		return ERROR_RESPONSE;
	}
};

exports.delete = async function (id, userID) {
	try {
		const deletedData = await Task.deleteOne({ _id: id, user_id: userID });
		if (deletedData.deletedCount > 0) {
			return {
				ok: true,
				message: 'Deleted Successfully',
			};
		}
		return ERROR_RESPONSE;
	} catch (error) {
		return ERROR_RESPONSE;
	}
};
