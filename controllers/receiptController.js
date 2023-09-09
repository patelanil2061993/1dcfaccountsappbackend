const Receipt = require('../models/Receipt'); // Import your Receipt model
const Client = require('../models/Client'); // Import your Client model

// Function to generate a unique serial number for receipts
const generateUniqueSerialNo = async () => {
    try {
      const lastReceipt = await Receipt.findOne({}, {}, { sort: { serialNo: -1 } });
  
      // Check if there are no receipts yet
      if (!lastReceipt) {
        return 1;
      }
  
      const newSerialNo = lastReceipt.serialNo + 1;
      return newSerialNo;
    } catch (err) {
      throw err;
    }
  };

exports.createReceipt = async (req, res) => {
  try {
    // Parse request data
    const { clientId, amount, modeOfPayment, receiverName } = req.body;

    // Check if a client is selected
    if (!clientId) {
      return res.status(400).json({ error: 'Client is not selected' });
    }

    // Fetch client data based on clientId
    const client = await Client.findById(clientId);

    // Check if the client exists
    if (!client) {
      return res.status(400).json({ error: 'Client not found' });
    }

    // Generate a unique serial number
    const serialNo = await generateUniqueSerialNo();

    // Create a new receipt
    const receipt = new Receipt({
      serialNo,
      clientId,
      clientName: client.name, // Assuming the client name is stored in the "name" field of the Client model
      clientAddress: client.address, // Assuming the client address is stored in the "address" field of the Client model
      amount,
      modeOfPayment,
      receiverName,
    });

    // Save the receipt
    const savedReceipt = await receipt.save();

    res.status(201).json(savedReceipt);
  } catch (err) {
    console.error('Error creating receipt:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getReceiptsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Check if the client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Find all receipts associated with the client
    const receipts = await Receipt.find({ clientId });

    res.status(200).json(receipts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



// const Receipt = require('../models/Receipt');
// const Client = require('../models/Client');

// exports.createReceipt = async (req, res) => {
//   try {
//     const { clientId, amount, modeOfPayment, receiverName } = req.body;

//     // Check if a client is selected
//     if (!clientId) {
//       return res.status(400).json({ error: 'Client is not selected' });
//     }

//     // Fetch client information
//     const client = await Client.findById(clientId);
//     if (!client) {
//       return res.status(404).json({ error: 'Client not found' });
//     }

//     // Create the receipt
//     const receipt = new Receipt({
//       clientId,
//       clientName: client.name,
//       clientAddress: client.address,
//       amount,
//       modeOfPayment,
//       receiverName,
//     });

//     const savedReceipt = await receipt.save();
//     res.status(201).json(savedReceipt);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};