const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const { validate } = require('../middlewares/validator');
const productValidation = require('../validations/product-validation');

router.get('/product', productController.getAllProduct);
router.post('/product', productController.createProduct);

module.exports = router;