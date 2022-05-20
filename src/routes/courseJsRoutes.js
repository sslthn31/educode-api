const express = require('express');
const router = express.Router();
const courseJsController = require('../controller/courseJsController');

router.post('/jscourse', courseJsController.createNewCourse)
router.get('/jscourse', courseJsController.getAllCourse);
router.get('/jscourse/:dataId', courseJsController.getCourseById);
router.put('/jscourse/:dataId', courseJsController.updateCourseData);
router.delete('/jscourse/:dataId', courseJsController.deleteCourseData);

module.exports = router;
