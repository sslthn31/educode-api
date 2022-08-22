const express = require('express');
const router = express.Router();
const observerController = require('../controller/observerController')

const app = express();

// JS
router.post('/observer', observerController.createNewCourse);
router.get('/observer', observerController.getAllCourse);
router.get('/observer/:dataId', observerController.getCourseById);
router.put('/observer/:dataId', observerController.updateCourseData);
router.delete('/observer/:dataId', observerController.deleteCourseData);


module.exports = router;
