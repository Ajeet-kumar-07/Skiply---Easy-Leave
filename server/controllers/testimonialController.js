// controllers/testimonialController.js

const Testimonial = require('../models/Testimonial');

// ✅ Add a testimonial (Admin)
exports.addTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      name: req.body.name,
      role: req.body.role,
      message: req.body.message
    });

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add testimonial', error: error.message });
  }
};

// ✅ Get all testimonials (Public)
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ datePosted: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
};

// ✅ Delete testimonial (Admin)
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
  }
};
