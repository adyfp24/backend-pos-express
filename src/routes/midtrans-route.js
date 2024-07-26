const express = require("express");
const router = express();
const midtransController = require('../controllers/midtrans-controller');

router.post('/create-snap', midtransController);

module.exports = router;