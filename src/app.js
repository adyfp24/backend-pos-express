const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth-route');
const productRoutes = require('./routes/product-route');
const orderRoutes = require('./routes/order-route');
const recordRoutes = require('./routes/record-route');

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({message: "welcome to POS api"})
})

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', orderRoutes);
app.use('/api/v1/', recordRoutes);

module.exports = app;