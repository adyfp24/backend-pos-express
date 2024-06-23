const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const { validate } = require('../middlewares/validator');
const orderValidation = require('../validations/order-validation');

router.post('/order', validate(orderValidation.createOrder), orderController.createOrder);
router.post('/order/:id/struct/', orderController.exportStruct);

module.exports = router;