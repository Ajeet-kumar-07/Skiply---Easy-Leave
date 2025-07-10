const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});
router.patch('/update', protect, updateUser);

module.exports = router;
