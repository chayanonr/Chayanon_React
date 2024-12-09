const express = require('express');
const router = express.Router(); // Initialize the router
const User = require('../models/UserModel');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


// Edit user details (Admin only)
router.put('/admin/edit/:id', verifyToken, isAdmin, async (req, res) => {
    try {
      const { name, email, role } = req.body;
  
      if (!name && !email && !role) {
        return res.status(400).json({ error: 'At least one field is required to update.' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role },
        { new: true, runValidators: true } // Return the updated document and apply validation
      ).select('-password'); // Exclude password from the response
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Export the router
module.exports = router;
