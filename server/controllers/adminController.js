// controllers/adminController.js
const User = require('../models/User');

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFeeStatus = async (req,res) =>{
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { feePaid: req.body.feePaid },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update fee status', error: err.message });
  }
};


module.exports = {
  getAllStudents,
  updateFeeStatus
};
