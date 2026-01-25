// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @route POST /api/auth/register
 * @desc Register a new user (Student / Warden / Admin)
 * @access Public
 */
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists with this email.' });
    }

    // 2. Decide final role (default to 'student' if missing/invalid)
    const allowedRoles = ['student', 'warden', 'admin'];
    const finalRole = allowedRoles.includes((role || '').toLowerCase())
      ? role.toLowerCase()
      : 'student';

    // 3. Create new user instance with role
    user = new User({ username, email, password, role: finalRole });

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Save user to database
    await user.save();

    // 6. Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // 7. Sign and return the JWT
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, username: user.username, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error during registration.');
  }
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and get token
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials.' });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials.' });
    }

    // 3. Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // 4. Sign and return JWT
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, username: user.username, role: user.role });
    });
  } catch (err) {
    console.error('Registration Catch Error:', err.message);
    // FIX: Send a proper JSON object even for 500 errors
    res.status(500).json({ msg: 'Server Error during registration.' }); 
  }
});

module.exports = router;