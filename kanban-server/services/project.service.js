const { isFalsy, sortBy } = require('../helper');
const Board = require('../models/board.model');
const Project = require('../models/project.model');
const { Task } = require('../models/task.model');

const ERROR_RESPONSE = {
	ok: false,
};

const isProjectOwner = async (projectID, userID) => !isFalsy(await Project.exists({ _id: projectID, user_id: userID }));

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

// *NOTE: add project_id field in board and task models for this to work.
exports.getOne = async function (projectId, userID) {
	try {
		let boardData = {};
		const [project, boards, tasks] = await Promise.all([
			Project.findOne({ _id: projectId, user_id: userID }),
			Board.find({ user_id: id, project_id: projectId }).lean().sort({ board_position: 'asc' }),
			Task.find({ user_id: id, project_id: projectId }).lean(),
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
exports.update = async function (projectID, projectDets, userID) {
	try {
		const updatedData = await Project.updateOne({ _id: projectID, user_id: userID }, { ...projectDets, user_id: userID });
		if (updatedData.modifiedCount > 0) {
			return { ok: true, message: 'Updated successfully' };
		}
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};
exports.delete = async function (projectID, userID) {
	try {
		const projectOwner = await isProjectOwner(projectID, userID);

		if (projectOwner) {
			// #TODO: Remove associated boards and tasks when project is deleted.

			// Code here

			await Project.deleteOne({ _id: projectID, user_id: userID });
			return {
				ok: true,
				message: 'Project deleted successfully.',
			};
		} else {
			return ERROR_RESPONSE;
		}
	} catch (e) {
		console.log(e);
		return ERROR_RESPONSE;
	}
};
