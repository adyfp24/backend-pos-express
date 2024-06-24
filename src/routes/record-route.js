const express = require('express');
const router = express.Router();
const recordController = require('../controllers/record-controller');
const { validate } = require('../middlewares/validator');
const recordValidation = require('../validations/record-validation');

router.get('/transaction-record', validate(recordValidation.getRecord), recordController.getTransactionRecord);

module.exports = router