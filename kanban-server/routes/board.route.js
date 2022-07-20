const express = require('express');
const BoardController = require('../controllers/board.controller');
const verifyAuth = require('../middlewares/auth');
const { boardNameValidator } = require('../validators/board.validator');

const router = express.Router();

router.use('/board', router);

router.post('/create', boardNameValidator, verifyAuth, BoardController.create);

router.patch(
	'/update/:id',
	boardNameValidator,
	verifyAuth,
	BoardController.update,
);

module.exports = router;
