const express = require("express");
const router = express.Router();
const midtransController = require('../controllers/midtrans-controller');

router.post('/create-snap', midtransController.createSnap);

module.exports = router;