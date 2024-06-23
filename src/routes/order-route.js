const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const { validate } = require('../middlewares/validator');
const orderValidation = require('../validations/order-validation');

router.post('/order', orderController);
router.get('/order/:id/struct/', );
