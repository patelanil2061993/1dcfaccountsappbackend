const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

// Create a new receipt
router.post('/', receiptController.createReceipt);

// Get all receipts
router.get('/', receiptController.getAllReceipts);

// New route to get all receipts for a specific client
router.get('/client/:clientId', receiptController.getReceiptsByClient);

module.exports = router;