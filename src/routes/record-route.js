const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record-controller');

router.get('/transaction-record', recordController.getTransactionRecord);

module.exports = router