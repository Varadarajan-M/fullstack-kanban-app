const express = require('express');
const TaskController = require('../controllers/task.controller');
const TaskValidator = require('../validators/task.validator');
const verifyAuth = require('../middlewares/auth');
const router = express.Router();

router.use('/task', router);

router.post(
	'/create',
	verifyAuth,
	TaskValidator.validateTasks,
	TaskController.create,
);

module.exports = router;
