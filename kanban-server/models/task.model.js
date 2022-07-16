const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		task_item: {
			type: String,
			required: true,
			unique: true,
		},
		task_position: {
			type: String,
			required: true,
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
	},
	{ timestamps: true },
);

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = Task;
