const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		task_item: {
			type: String,
			required: true,
		},
		task_position: {
			type: Number,
		},
		board_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Board',
		},
		user_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		project_id: {
			type: mongoose.Types.ObjectId,
			ref: 'Project',
		},
	},
	{ timestamps: true },
);

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = {
	TaskSchema,
	Task,
};
