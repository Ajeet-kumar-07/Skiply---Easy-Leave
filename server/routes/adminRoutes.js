const express = require('express');
const router = express.Router();
const { getAllStudents, updateFeeStatus } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/students', protect, authorizeRoles('admin'), getAllStudents);
router.patch('/fee/:id', protect, authorizeRoles('admin'), updateFeeStatus);

module.exports = router;
