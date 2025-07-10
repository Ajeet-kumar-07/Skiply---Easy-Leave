// controllers/leaveController.js

const Leave = require('../models/Leave');

// ✅ Student applies for leave
exports.applyLeave = async (req, res) => {
  try {
    console.log("👉 Apply Leave called by user:", req.user); 
    const leave = await Leave.create({
      student: req.user._id,
      from: req.body.from,
      to: req.body.to,
      reason: req.body.reason
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: 'Failed to apply for leave', error: error.message });
  }
  
};

// ✅ Student views their leave history
exports.getMyLeaves = async (req, res) => {
  try {
    console.log('👉 USER:', req.user);

    const leaves = await Leave.find({ student: req.user._id }).sort({ createdAt: -1 });

    console.log('👉 LEAVES:', leaves);
    res.json(leaves);
  } catch (error) {
    console.error('❌ Error in getMyLeaves:', error);
    res.status(500).json({ message: 'Unable to fetch leaves', error: error.message });
  }
};


// ✅ Admin views all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const allLeaves = await Leave.find().populate('student', 'name email').sort({ createdAt: -1 });
    res.json(allLeaves);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leave data', error: error.message });
  }
};

// ✅ Admin updates status (approve/reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('student', 'name email');

    if (!updated) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update leave status', error: error.message });
  }
};
