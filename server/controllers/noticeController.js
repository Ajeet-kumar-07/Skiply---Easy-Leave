// controllers/noticeController.js

const Notice = require('../models/Notice');

// ✅ Create a new notice (Admin)
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      message: req.body.message,
      createdBy: req.user._id,
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ message: 'Failed to post notice', error: error.message });
  }
};

// ✅ Get all notices (Public)
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notices', error: error.message });
  }
};

// ✅ Delete a notice (Admin)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notice', error: error.message });
  }
};
