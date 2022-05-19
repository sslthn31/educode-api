const express = require('express');
const router = express.Router();
const dummyController = require('../controller/dummyController');

router.post('/data', dummyController.createNewDummy);
router.get('/data', dummyController.getAllDummy);
router.get('/data/:dataId', dummyController.getDummyById);
router.put('/data/:dataId', dummyController.updateDummyData);
router.delete('/data/:dataId', dummyController.deleteDummyData);


module.exports = router;
