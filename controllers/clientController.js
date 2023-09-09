// controllers/clientController.js
const Client = require('../models/Client');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const client = new Client({
      name,
      address,
      phone,
    });
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        phone,
      },
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};