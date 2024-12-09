const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(helmet()); // Add security headers
app.use(morgan('common')); // Log requests
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Replace with your frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Import Routes
const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');

// Mount Routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// MongoDB Connection
mongoose.set('strictQuery', true); // Suppress Mongoose deprecation warnings
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
