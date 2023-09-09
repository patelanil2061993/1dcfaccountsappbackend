const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
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
  billNo: {
    type: String,
    unique: true,
    required: true,
  },
  products: [
    {
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  // Add any other desired fields here
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
