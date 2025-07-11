// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
// Load env variables
dotenv.config();

// Import route files
const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leave');
const noticeRoutes = require('./routes/notice');
const testimonialRoutes = require('./routes/testimonial');
const adminRoutes = require('./routes/adminRoutes');

// Init app
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "https:", "blob:"],
        "default-src": ["'self'", "https:", "blob:"],
        "img-src": ["'self'", "data:", "blob:"],
        "connect-src": ["'self'", "https:", "blob:"],
      }
    }
  })
);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
console.log("🔁 Loading authRoutes");
app.use('/api/auth', authRoutes);

console.log("🔁 Loading leaveRoutes");
app.use('/api/leave', leaveRoutes);

console.log("🔁 Loading noticeRoutes");
app.use('/api/notices', noticeRoutes);

console.log("🔁 Loading testimonialRoutes");
app.use('/api/testimonials', testimonialRoutes);

console.log("🔁 Loading adminRoutes");
app.use('/api/admin', adminRoutes);


//production
// Serve frontend static files (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}


// Health check
app.get('/', (req, res) => {
  res.send('✅ Skiply  is running');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})
.catch(err => console.error('❌ MongoDB connection error:', err));
