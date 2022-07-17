const mongoose = require('mongoose');
const { TaskSchema } = require('./task.model');

const BoardSchema = new mongoose.Schema(
	{
		board_name: {
			type: String,
			required: true,
		},
		user_id: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		board_position: {
			type: Number,
			required: true,
		},
		tasks: {
			type: [TaskSchema],
			sparse: true,
		},
	},
	{ timestamps: true },
);

const Board = mongoose.model('Boards', BoardSchema);

module.exports = Board;
