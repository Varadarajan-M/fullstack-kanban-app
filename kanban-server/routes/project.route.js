const express = require('express');
const ProjectController = require('../controllers/project.controller');
const verifyAuth = require('../middlewares/auth');

const router = express.Router();

router.use('/project', router);

router.get('/get', verifyAuth, ProjectController.get);

router.get('/get-one/:id', verifyAuth, ProjectController.getOne);

router.post('/create', verifyAuth, ProjectController.create);

router.post('/save-changes/:id', verifyAuth, ProjectController.saveChanges);

router.patch('/update/:id', verifyAuth, ProjectController.update);

router.delete('/delete/:id', verifyAuth, ProjectController.delete);

module.exports = router;
