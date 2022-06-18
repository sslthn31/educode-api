const express = require('express');
const router = express.Router();
const courseJsController = require('../controller/courseJsController');
const courseHtmlController = require('../controller/coursehtmlController');
const courseCssController = require('../controller/courseCssController');

// JS
router.post('/jscourse', courseJsController.createNewCourse);
router.get('/jscourse', courseJsController.getAllCourse);
router.get('/jscourse/:dataId', courseJsController.getCourseById);
router.put('/jscourse/:dataId', courseJsController.updateCourseData);
router.delete('/jscourse/:dataId', courseJsController.deleteCourseData);

// HTML
router.post('/htmlcourse', courseHtmlController.createNewCourse);
router.get('/htmlcourse', courseHtmlController.getAllCourse);
router.get('/htmlcourse/:dataId', courseHtmlController.getCourseById);
router.put('/htmlcourse/:dataId', courseHtmlController.updateCourseData);
router.delete('/htmlcourse/:dataId', courseHtmlController.deleteCourseData);

// CSS
router.post('/csscourse', courseCssController.createNewCourse);
router.get('/csscourse', courseCssController.getAllCourse);
router.get('/csscourse/:dataId', courseCssController.getCourseById);
router.put('/csscourse/:dataId', courseCssController.updateCourseData);
router.delete('/csscourse/:dataId', courseCssController.deleteCourseData);

module.exports = router;
