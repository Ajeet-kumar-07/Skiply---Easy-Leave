const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  year: String,
  role: { type: String, default: 'student' }, // 'admin' or 'student'
  feesPaid: {
  type: Boolean,
  default: false
  },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
