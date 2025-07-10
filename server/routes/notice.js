// routes/notice.js

const express = require('express');
const router = express.Router();
const {
  createNotice,
  getAllNotices,
  deleteNotice
} = require('../controllers/noticeController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public: Get All Notices
router.get('/', getAllNotices);

// Admin: Create a Notice
router.post('/admin', protect, authorizeRoles('admin'), createNotice);

// Admin: Delete Notice
router.delete('/admin/:id', protect, authorizeRoles('admin'), deleteNotice);

module.exports = router;
