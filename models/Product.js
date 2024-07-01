const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  order_no: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  product_brand: { type: String, required: true },
  product_size: { type: String, required: true },
  product_color: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image_url: { type: String, default: '' },
});

module.exports = mongoose.model('Product', ProductSchema);
