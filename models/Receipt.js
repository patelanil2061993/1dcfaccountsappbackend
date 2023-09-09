const mongoose = require('mongoose');

const { Schema } = mongoose;

const receiptSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  serialNo: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  // Add any other desired fields here
}, { timestamps: true });

module.exports = mongoose.model('Receipt', receiptSchema);