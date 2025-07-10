const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware'); // ✅ destructure properly

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me
router.get('/me', protect, (req, res) => {
  const user = req.user;
  res.json({ user });
});

// PATCH /api/auth/update
router.patch('/update', protect, updateUser);

module.exports = router;
