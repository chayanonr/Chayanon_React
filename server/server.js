const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP if needed
})); // Add security headers
app.use(morgan('common')); // Log requests
app.use(cors({
  origin: ['http://localhost:3000', 'https://chayanonrod.vercel.app'], // Update your frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', apiLimiter);

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

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// MongoDB Connection
mongoose.set('strictQuery', true); // Suppress Mongoose deprecation warnings
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err.message);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};
connectWithRetry();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
