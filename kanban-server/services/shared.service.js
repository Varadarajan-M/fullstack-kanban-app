const { isFalsy } = require('../helper');
const Board = require('../models/board.model');
const { Task } = require('../models/task.model');
const ERROR_RESPONSE = {
	ok: false,
};

exports.getBoardData = async function (id) {
	let boardData = {};
	try {
		const [boards, tasks] = await Promise.all([
			Board.find({ user_id: id }).lean(),
			Task.find({ user_id: id }).lean(),
		]);

		if (boards?.length > 0) {
			boards.forEach((board) => {
				boardData[[board.board_name]] = {
					...board,
					tasks: tasks?.filter(
						(task) =>
							task.board_id.toString() === board._id.toString(),
					),
				};
			});
		}
		return { ok: true, boardData };
	} catch (e) {
		return ERROR_RESPONSE;
	}
};

const isBoardOwner = async (userId, boardId) =>
	!isFalsy(await Board.exists({ _id: boardId, user_id: userId }));

exports.bulkUpdateTasks = async (updatedTasks, deletedStack, userID) => {
	try {
		await Promise.all(
			updatedTasks?.map(async (task) => {
				if (await isBoardOwner(userID, task?.board_id)) {
					return Task.updateOne(
						{ _id: task._id, user_id: userID },
						task,
					);
				}
			}),
		);
		if (
			deletedStack.hasOwnProperty('boards') &&
			deletedStack?.boards.length > 0
		) {
			await Promise.all(
				deletedStack.boards.map(async (board, i) => {
					i === 0 && (await Task.deleteMany({ board_id: board._id }));
					return Board.deleteOne({ _id: board._id, user_id: userID });
				}),
			);
		}
		if (
			deletedStack.hasOwnProperty('tasks') &&
			deletedStack?.tasks.length > 0
		) {
			await Promise.all(
				deletedStack?.tasks?.map((task) => {
					return Task.deleteOne({ _id: task._id, user_id: userID });
				}),
			);
		}
		return { ok: true, message: 'Saved changes successfully' };
	} catch (e) {
		console.log('Error: ' + e.message);
		return ERROR_RESPONSE;
	}
};
