const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// Import Routes
const userRoutes = require('./routes/UserRoutes'); // Ensure this path is correct


// Mount Routes
app.use('/api', userRoutes);

const adminRoutes = require('./routes/AdminRoutes'); // Import admin routes
app.use('/api', adminRoutes); // Mount admin routes under "/api"

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Start Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
