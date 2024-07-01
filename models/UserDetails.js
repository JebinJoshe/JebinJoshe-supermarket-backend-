const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);