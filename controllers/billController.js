const Bill = require('../models/Bill');
const Client = require('../models/Client');
const Receipt = require('../models/Receipt');

const generateUniqueBillNumber = async () => {
  try {
    const lastBill = await Bill.findOne({}, {}, { sort: { billNo: -1 } });
    const newBillNo = lastBill ? parseInt(lastBill.billNo) + 1 : 1;

    const existingBill = await Bill.findOne({ billNo: newBillNo.toString() });

    if (existingBill) {
      return findUniqueBillNumber(newBillNo);
    }

    return newBillNo.toString();
  } catch (err) {
    throw err; // Propagate the error for handling at a higher level
  }
};

const findUniqueBillNumber = async (newBillNo) => {
  try {
    while (true) {
      const existingBill = await Bill.findOne({ billNo: newBillNo.toString() });

      if (!existingBill) {
        return newBillNo.toString();
      }

      newBillNo++;
    }
  } catch (err) {
    throw err; // Propagate the error for handling at a higher level
  }
};

exports.createBill = async (req, res) => {
  try {
    const { clientId, products } = req.body;

    if (!clientId) {
      return res.status(400).json({ error: 'Client is not selected' });
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const totalAmount = products.reduce((total, product) => total + product.amount, 0);

    const billNo = await generateUniqueBillNumber();

    const bill = new Bill({
      clientId,
      clientName: client.name,
      clientAddress: client.address,
      billNo,
      products,
      totalAmount,
    });

    const savedBill = await bill.save();

    res.status(201).json(savedBill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const { clientId, products } = req.body;

    // Fetch client information
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Calculate the total amount based on product details
    const totalAmount = products.reduce((total, product) => total + product.amount, 0);

    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        clientId,
        clientName: client.name,
        clientAddress: client.address,
        products,
        totalAmount,
        // Add other fields as desired
      },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(updatedBill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndRemove(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBillsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Check if the client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Find all bills associated with the client
    const bills = await Bill.find({ clientId });

    res.status(200).json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllBillsAndReceiptsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Check if the client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Find all bills associated with the client
    const bills = await Bill.find({ clientId });

    // Use a separate route to get all receipts for the client
    const receiptsResponse = await axios.get(
      `http://localhost:5000/api/receipts/client/${clientId}`
    );
    const receipts = receiptsResponse.data;

    res.status(200).json({ client, bills, receipts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};