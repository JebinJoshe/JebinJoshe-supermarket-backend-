const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Database Config
const db = require('./config/db');
const MONGODB_URI = process.env.MONGODB_URI; // Make sure this environment variable is set

console.log('MongoDB URI:', MONGODB_URI);

// Connect to MongoDB


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
