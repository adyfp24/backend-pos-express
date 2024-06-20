const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { validate } = require('../middlewares/validator');
const authValidation = require('../validations/auth-validation');

router.post('/login', validate(authValidation.loginUser), authController.login);
router.post('/register', validate(authValidation.registUser), authController.register);

module.exports = router;