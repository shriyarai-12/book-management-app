const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // make sure this secret matches login!
    req.user = decoded; // Attach user to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Access Denied: Invalid token' });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    // 🔥 This is very important:
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Access Denied' });
    }
  };
};

module.exports = { authenticate, authorizeRole };