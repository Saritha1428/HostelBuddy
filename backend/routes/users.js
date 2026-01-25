
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Requires auth.js
const User = require('../models/User'); 

/**
 * @route GET /api/users/me
 * @desc Get authenticated user's details (Used for testing JWT)
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    // req.user.id is set by the 'auth' middleware after token verification
    // .select('-password') prevents sending the hashed password back
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
        return res.status(404).json({ msg: 'User not found.' });
    }
    
    res.json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;