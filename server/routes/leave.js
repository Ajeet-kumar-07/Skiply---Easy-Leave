// routes/leave.js

const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');

const leaveController = require('../controllers/leaveController');
// const {protect} = require('../middleware/authMiddleware');


const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Student: Apply Leave
router.post('/apply', protect, authorizeRoles('student'), applyLeave);

// Student: View Own Leaves
router.get('/status', protect, authorizeRoles('student'), getMyLeaves);

// Admin: View All Leaves
router.get('/all', protect, authorizeRoles('admin'), getAllLeaves);

// Admin: Approve/Reject
router.patch('/approve/:id', protect, authorizeRoles('admin'), updateLeaveStatus);

//new route for logged in students 
router.get('/mine', protect , leaveController.getMyLeaves);

module.exports = router;
