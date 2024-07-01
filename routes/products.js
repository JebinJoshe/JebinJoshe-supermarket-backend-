const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Get All Products for a Specific User
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const validUserId = ObjectId.isValid(user_id) ? new ObjectId(user_id) : null;
    if (!validUserId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const products = await Product.find({ user_id: validUserId });
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }

    res.json({
      message: 'Products retrieved successfully',
      count: products.length,
      products: products
    });
  } catch (err) {
    console.error(err); // Log the error on the server side
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});
// Add Product
// Add Product
router.post('/add', async (req, res) => {
  const { order_no, product_name, product_brand, product_size, product_color, user_id, image_url, quantity } = req.body;

  try {
    if (!ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Basic validation (you might want to expand this)
    if (!order_no || !product_name || !product_brand) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = new Product({
      order_no,
      product_name,
      product_brand,
      product_size,
      product_color,
      user_id: new ObjectId(user_id),
      image_url,
      quantity: quantity || 0 // Set quantity, default to 0 if not provided
    });

    const product = await newProduct.save();
    res.status(201).json({ 
      message: 'Product successfully added to database',
      product: product 
    });
  } catch (err) {
    console.error(err); // Log the error on the server side
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Update Product
router.put('/updateProduct', async (req, res) => {
  const { order_no, user_id, quantity, product_name, product_brand, product_size, product_color } = req.body;

  try {
    const validUserId = ObjectId.isValid(user_id) ? new ObjectId(user_id) : null;
    
    if (!validUserId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    if (!order_no) {
      return res.status(400).json({ error: 'Order number is required' });
    }

    const product = await Product.findOne({ order_no: order_no, user_id: validUserId });
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.product_name = product_name || product.product_name;
    product.product_brand = product_brand || product.product_brand;
    product.product_size = product_size || product.product_size;
    product.product_color = product_color || product.product_color;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Delete Product
// Delete Product by User ID and Order Number
router.delete('/deleteProduct', async (req, res) => {
  const { user_id, order_no } = req.query;
  
  try {
    const validUserId = ObjectId.isValid(user_id) ? new ObjectId(user_id) : null;
    
    if (!validUserId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    if (!order_no) {
      return res.status(400).json({ error: 'Order number is required' });
    }

    const result = await Product.deleteOne({ user_id: validUserId, order_no: order_no });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Product not found or not authorized to delete' });
    }

    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});
module.exports = router;
