const { isFalsy, sortBy } = require('../helper');
const Board = require('../models/board.model');
const Project = require('../models/project.model');
const { Task } = require('../models/task.model');
const { isBoardOwner } = require('./shared.service');

const ERROR_RESPONSE = {
	ok: false,
};

const isProjectOwner = async (projectID, userID) => !isFalsy(await Project.exists({ _id: projectID, user_id: userID }));

exports.isProjectOwnerService = isProjectOwner;

exports.get = async function (userID) {
	try {
		return {
			ok: true,
			projects: await Project.find({ user_id: userID }).lean(),
		};
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};

exports.getOne = async function (projectId, userID) {
	const projectOwner = await isProjectOwner(projectId, userID);

	if (!projectOwner) return ERROR_RESPONSE;

	try {
		let boardData = {};
		const [project, boards, tasks] = await Promise.all([
			Project.findOne({ _id: projectId, user_id: userID }).lean(),
			Board.find({ user_id: userID, project_id: projectId }).lean().sort({ board_position: 'asc' }),
			Task.find({ user_id: userID, project_id: projectId }).lean(),
		]);

		if (boards?.length > 0) {
			boards.forEach((board) => {
				const boardTasks = sortBy(
					tasks?.filter((task) => task.board_id.toString() === board._id.toString()),
					'task_position',
				);

				boardData[board.board_position] = {
					...board,
					tasks: boardTasks,
				};
			});
		}
		return { ok: true, data: { ...project, boards: boardData } };
	} catch (error) {
		console.log(error);
		return ERROR_RESPONSE;
	}
};

exports.create = async function (projectDets, userID) {
	try {
		const newProject = await Project.create({
			...projectDets,
			user_id: userID,
		});
		return {
			ok: true,
			project: newProject,
		};
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};
exports.update = async function (projectID, { project_name }, userID) {
	const projectOwner = await isProjectOwner(projectID, userID);

	if (!projectOwner) return ERROR_RESPONSE;
	try {
		const updatedData = await Project.updateOne({ _id: projectID, user_id: userID }, { project_name, user_id: userID });
		if (updatedData.modifiedCount > 0) {
			return { ok: true, message: 'Updated successfully' };
		}
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};
exports.delete = async function (projectID, userID) {
	const projectOwner = await isProjectOwner(projectID, userID);
	if (!projectOwner) return ERROR_RESPONSE;

	try {
		await Promise.all([
			Board.deleteMany({ project_id: projectID, user_id: userID }),
			Task.deleteMany({ project_id: projectID, user_id: userID }),
			Project.deleteOne({ _id: projectID, user_id: userID }),
		]);
		return {
			ok: true,
			message: 'Project deleted successfully.',
		};
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};

exports.saveChanges = async function (updatedTasks, deletedStack, userID, projectID) {
	const projectOwner = await isProjectOwner(projectID, userID);
	if (!projectOwner) return ERROR_RESPONSE;

	try {
		await Promise.all(
			updatedTasks?.map(async (task) => {
				if (await isBoardOwner(userID, task?.board_id)) {
					return Task.updateOne({ _id: task._id, user_id: userID, project_id: projectID }, task);
				}
			}),
		);
		if (deletedStack.hasOwnProperty('boards') && deletedStack?.boards.length > 0) {
			await Promise.all(
				deletedStack.boards.map(async (board, i) => {
					i === 0 && (await Task.deleteMany({ board_id: board._id }));
					return Board.deleteOne({ _id: board._id, user_id: userID });
				}),
			);
		}
		if (deletedStack.hasOwnProperty('tasks') && deletedStack?.tasks.length > 0) {
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
