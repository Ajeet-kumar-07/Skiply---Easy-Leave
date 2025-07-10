// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStudents, updateFeeStatus } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Get all students (admin only)
router.get('/students', protect, authorizeRoles('admin'), getAllStudents);

// ✅ PATCH route to update fee status
router.patch('/fee/:id', protect, authorizeRoles('admin'), updateFeeStatus);
module.exports = router;
