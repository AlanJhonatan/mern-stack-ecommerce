const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// Using all .env configs
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const braintreeRoutes = require('./routes/braintree');

// Initialize server app
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('🍃 Connected to MongoDB !'));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', braintreeRoutes);

// PORT config handling
const port = process.env.PORT || 8000;

// Server initializing
app.listen(port, () => {
  console.log(`🔥 Server has started at http://localhost:${port}`);
});
