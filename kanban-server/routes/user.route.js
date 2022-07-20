const express = require('express');
const UserController = require('../controllers/user.controller');
const UserValidator = require('../validators/user.validator');
const router = express.Router();

router.use('/user', router);

router.route('/register').post(UserValidator.register, UserController.register);

router.route('/login').post(UserValidator.login, UserController.login);

module.exports = router;
