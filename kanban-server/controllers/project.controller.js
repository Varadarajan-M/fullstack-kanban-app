const ProjectService = require('../services/project.service');
const { sendSuccessPayload, throwError, sendError } = require('../helper');

exports.get = async (req, res) => {
	const projectData = await ProjectService.get(req?.user?.userID);
	if (projectData.ok) {
		sendSuccessPayload(res, projectData.projects, 200);
	} else {
		const CANNOT_GET_PROJECT_ERR = throwError('Cannot get Project details', 400);
		sendError(res, CANNOT_GET_PROJECT_ERR);
	}
};

exports.getOne = async (req, res) => {
	const project = await ProjectService.getOne(req.params?.id ?? -1, req?.user?.userID);
	if (project.ok) {
		sendSuccessPayload(res, project.data, 200);
	} else {
		const CANNOT_GET_PROJECT_ERR = throwError('Cannot get Project details', 400);
		sendError(res, CANNOT_GET_PROJECT_ERR);
	}
};

exports.create = async (req, res) => {
	const newProject = await ProjectService.create(req.body, req?.user?.userID);
	if (newProject.ok) {
		sendSuccessPayload(res, newProject.project, 200);
	} else {
		const CANNOT_CREATE_PROJECT_ERR = throwError('Cannot create Project', 400);
		sendError(res, CANNOT_CREATE_PROJECT_ERR);
	}
};

exports.update = async (req, res) => {
	const isProjectUpdated = await ProjectService.update(req?.params?.id ?? -1, req.body ?? {}, req?.user?.userID);
	if (isProjectUpdated?.ok) {
		sendSuccessPayload(res, isProjectUpdated.message, 200);
	} else {
		const CANNOT_UPDATE_PROJECT_ERR = throwError('Cannot update Project', 400);
		sendError(res, CANNOT_UPDATE_PROJECT_ERR);
	}
};

exports.delete = async (req, res) => {
	const isProjectDeleted = await ProjectService.delete(req?.params?.id ?? -1, req?.user?.userID);
	if (isProjectDeleted?.ok) {
		sendSuccessPayload(res, isProjectDeleted.message, 200);
	} else {
		const CANNOT_DELETE_PROJECT_ERR = throwError('Cannot delete Project', 400);
		sendError(res, CANNOT_DELETE_PROJECT_ERR);
	}
};

exports.saveChanges = async (req, res) => {
	const updatedData = await ProjectService.saveChanges(
		req?.body?.tasks,
		req?.body?.deletedStack ?? {},
		req?.user?.userID,
		req?.params?.id ?? -1,
	);
	if (updatedData.ok) {
		sendSuccessPayload(res, updatedData.message, 200);
	} else {
		sendError(res, throwError('Something went wrong', 400));
	}
};
