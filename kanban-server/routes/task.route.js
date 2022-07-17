const express = require('express');
const TaskController = require('../controllers/task.controller');
const verifyAuth = require('../middlewares/auth');
const router = express.Router();

router.use('/task', router);

router.post('/create', verifyAuth, TaskController.create);

router.patch('/update/:id', verifyAuth, TaskController.update);

router.delete('/delete/:id', verifyAuth, TaskController.delete);

module.exports = router;
