// models/Testimonial.js

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true },
  datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
