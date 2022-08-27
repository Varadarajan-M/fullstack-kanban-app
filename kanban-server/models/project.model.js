const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
	{
		project_name: {
			type: 'string',
			default: 'Untitled project',
		},
		user_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
