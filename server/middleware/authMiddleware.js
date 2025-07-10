// // middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Middleware to protect routes (checks if token is valid)
// exports.protect = async (req, res, next) => {
//   let token;

//   // Check for token in header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request
//       req.user = await User.findById(decoded.id).select('-password');
//       // next();

//       if (!req.user) {
//         return res.status(401).json({ message: 'Unauthorized: user not found' });
//       }
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Unauthorized: invalid token' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }
// };

// // Middleware for role-based access control
// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
//     }
//     next();
//   };
// };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (checks if token is valid)
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user and exclude password
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

// Middleware to restrict access by roles (e.g., admin, student)
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied for role: ${req.user?.role}` });
    }
    next();
  };
};

