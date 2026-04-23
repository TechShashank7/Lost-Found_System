const Item = require('../models/Item');

// @route POST /api/items
const createItem = async (req, res) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;
    const item = await Item.create({
      itemName, description, type, location, date, contactInfo, user: req.user.id
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route GET /api/items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route GET /api/items/search?name=xyz
const searchItems = async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    if (name) {
      query.itemName = { $regex: name, $options: 'i' };
    }
    const items = await Item.find(query).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route PUT /api/items/:id
const updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if the logged-in user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to update this item' });
    }
    
    item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if the logged-in user owns the item
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to delete this item' });
    }
    
    await item.deleteOne();
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createItem, getItems, searchItems, getItemById, updateItem, deleteItem };
