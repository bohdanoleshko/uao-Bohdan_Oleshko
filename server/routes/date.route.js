const express = require('express');
const router = express.Router();
const DateController = require('../controllers/DateController');

router.post('/create', DateController.createRecord);
router.get('/records', DateController.getRecords);
router.put('/update/:id', DateController.updateRecord);
router.delete('/delete/:id', DateController.deleteRecord);

module.exports = router;
