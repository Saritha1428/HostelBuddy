const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const RoomApplication = require('../models/RoomApplication');
const StudentProfile = require('../models/StudentProfile'); // MISSING IMPORT ADDED

const studentAuth = [auth, authorize(['student'])];

// GET Profile
router.get('/profile', auth, async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user.id })
            .populate('user', ['username', 'email']); 

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST/UPDATE Profile
router.post('/profile', studentAuth, async (req, res) => {
    const { studentId, department, phone } = req.body;
    try {
        let profile = await StudentProfile.findOne({ user: req.user.id });
        
        const profileFields = {
            user: req.user.id,
            studentId,
            department,
            contactNumber: phone // Mapping frontend phone to backend contactNumber
        };

        if (profile) {
            profile = await StudentProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        profile = new StudentProfile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ... Keep your RoomApplication routes below ...
module.exports = router;