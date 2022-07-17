const express = require('express');
const SharedController = require('../controllers/shared.controller');
const verifyAuth = require('../middlewares/auth');

const router = express.Router();

router.use('/shared', router);

router.get('/board-data', verifyAuth, SharedController.getBoardData);

router.put('/bulk-update-tasks', verifyAuth, SharedController.bulkUpdateTasks);

module.exports = router;
