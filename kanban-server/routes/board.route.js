const express = require('express');
const BoardController = require('../controllers/board.controller');
const verifyAuth = require('../middlewares/auth');

const router = express.Router();

router.use('/board', router);

router.post('/create', verifyAuth, BoardController.create);

router.patch('/update/:id', verifyAuth, BoardController.update);

router.delete('/delete/:id', verifyAuth, BoardController.delete);

module.exports = router;
