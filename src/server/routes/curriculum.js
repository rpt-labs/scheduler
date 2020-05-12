const { Router } = require('express');
const curriculumRouter = Router();
const curriculumController = require('../controllers/curriculumController');


curriculumRouter.get('/curriculum/:cohortId', curriculumController.getCurriculumByCohortId);

module.exports = curriculumRouter;
