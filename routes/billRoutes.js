// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const billController = require('../controllers/billController');
const receiptController = require('../controllers/receiptController');

// Create a new bill
router.post('/', billController.createBill);

// Get all bills
router.get('/', billController.getAllBills);

// Get a single bill by ID
router.get('/:id', billController.getBillById);

// Update a bill by ID
router.put('/:id', billController.updateBill);

// Delete a bill by ID
router.delete('/:id', billController.deleteBill);

// New route to get all bills for a specific client
router.get('/client/:clientId', billController.getBillsByClient);

// Get all bills and receipts for a client
router.get('/clients/:clientId/bills-and-receipts', billController.getAllBillsAndReceiptsByClient);

module.exports = router;