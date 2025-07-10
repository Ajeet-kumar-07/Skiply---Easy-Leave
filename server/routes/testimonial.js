// routes/testimonial.js

const express = require('express');
const router = express.Router();
const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial
} = require('../controllers/testimonialController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public: View Testimonials
router.get('/', getTestimonials);

// Admin: Post Testimonial
router.post('/', protect, authorizeRoles('admin'), addTestimonial);

// Admin: Delete Testimonial
router.delete('/:id', protect, authorizeRoles('admin'), deleteTestimonial);

module.exports = router;
