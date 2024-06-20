const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const { validate } = require('../middlewares/validator');
const productValidation = require('../validations/product-validation');

router.get('/product', productController.getAllProduct);
router.get('/product/:id', productController.getProductById);
router.post('/product', validate(productValidation.createProduct), productController.createProduct);
router.delete('/product/:id', productController.deleteProduct);
router.put('/product/:id', validate(productValidation.updateProduct), productController.updateProduct);

module.exports = router;