// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Get token from header (usually sent as 'x-auth-token')
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    // 3. Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach user payload (id and role) to the request object
    req.user = decoded.user;
    
    // 5. Move to the next middleware or route handler
    next();
  } catch (err) {
    // Token is invalid (e.g., expired or tampered)
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};