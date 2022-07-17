const mongoose = require('mongoose');
const Board = require('./board.model');

const TaskSchema = new mongoose.Schema(
	{
		task_item: {
			type: String,
			required: true,
			sparse: true,
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
	},
	{ timestamps: true },
);

TaskSchema.post('updateOne', async function (document) {
	const doc = await this.model.findOne({ ...this.getQuery() });
	const targetBoard = await Board.findById(doc.board_id);
	const updatedTasks = targetBoard.tasks.map((task) =>
		task._id.toString() === doc._id.toString() ? doc : task,
	);
	const update = await Board.updateOne(
		{ _id: doc.board_id },
		{
			tasks: updatedTasks,
		},
	);
});

TaskSchema.post('save', async function (document) {
	console.log('Task created', document);
	const targetBoard = await Board.findById(document.board_id);
	const tasks = [document, ...targetBoard?.tasks];
	const update = await Board.updateOne(
		{ _id: document.board_id },
		{
			tasks,
		},
	);
});

TaskSchema.pre('deleteOne', async function (document) {
	const doc = await this.model.findOne({ ...this.getQuery() });
	const targetBoard = await Board.findById(doc.board_id);
	const updatedTasks = targetBoard.tasks.filter(
		(task) => task._id.toString() !== doc._id.toString(),
	);
	const update = await Board.updateOne(
		{ _id: doc.board_id },
		{
			tasks: updatedTasks,
		},
	);
});

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = {
	TaskSchema,
	Task,
};
