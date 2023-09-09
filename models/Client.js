// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String, // Assuming "address" is a string, you can adjust the type as needed
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Client', clientSchema);