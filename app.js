// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Set up body parser middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Include client-related routes
const clientRoutes = require('./routes/clientRoutes');
app.use('/api/clients', clientRoutes);

// Include bill-related routes
const billRoutes = require('./routes/billRoutes');
app.use('/api/bills', billRoutes);

// Import receipt routes
const receiptRoutes = require('./routes/receiptRoutes');

// Use receipt routes
app.use('/api/receipts', receiptRoutes);

// ... Other route includes and middleware setup

module.exports = app; // Export the Express app instance
