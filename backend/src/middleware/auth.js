// auth.js — JWT Authentication Middleware
//
// HOW JWT WORKS (important to understand this):
// 1. User logs in → server creates a JWT token signed with a secret
// 2. Client stores the token (in memory or localStorage)
// 3. On every protected request, client sends: Authorization: Bearer <token>
// 4. This middleware intercepts the request, verifies the token,
//    and attaches the user data to req.user
// 5. If the token is missing or invalid → 401 Unauthorized
//
// The key insight: the server NEVER stores the session.
// Everything needed is encoded IN the token itself. That's what "stateless" means.

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Get the Authorization header
  const authHeader = req.headers['authorization'];

  // 2. Validate format: must be "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // 3. Extract the token (split on space, take index 1)
  const token = authHeader.split(' ')[1];

  // 4. Verify the token using our secret
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload (id, email) to the request
    next();             // Proceed to the actual route handler
  } catch (err) {
    // Token is expired or tampered with
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
