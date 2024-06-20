const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth-route');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

module.exports = app;