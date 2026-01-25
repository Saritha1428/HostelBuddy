// backend/routes/admin.js
const express = require('express');
const router = express.Router(); // <--- FIX: Initializes the router object
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const RoomApplication = require('../models/RoomApplication'); 
const LeaveApplication = require('../models/LeaveApplication');
const WardenProfile = require('../models/WardenProfile');

// Middleware array to check for Warden or Admin role
const wardenAuth = [auth, authorize(['warden', 'admin'])];

// ===============================================
// 1. Dashboard and General Admin Routes
// ===============================================

/**
 * @route GET /api/admin/dashboard
 * @desc Get basic statistics (Only for Warden/Admin)
 * @access Private
 */
router.get('/dashboard', wardenAuth, async (req, res) => {
    try {
        // This is a placeholder for actual statistics fetching (e.g., counting documents)
        const stats = {
            totalStudents: 150,
            pendingLeaves: 5,
            userRole: req.user.role // Confirming the authorized role
        };
        res.json({ msg: 'Welcome to the Admin Dashboard.', stats });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/room-applications', wardenAuth, async (req, res) => {
    try {
        // Find all applications where status is 'Pending'
        const applications = await RoomApplication.find({ status: 'Pending' })
            // Populate the 'student' field to show username/email instead of ID
            .populate('student', ['username', 'email']) 
            .sort({ applicationDate: -1 }); // Show newest first

        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.patch('/room-applications/:id/status', wardenAuth, async (req, res) => {
    const applicationId = req.params.id;
    const { status } = req.body; // status should be 'Approved', 'Rejected', or 'Assigned'

    if (!['Approved', 'Rejected', 'Assigned'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status provided.' });
    }

    try {
        const updatedApplication = await RoomApplication.findByIdAndUpdate(
            applicationId,
            { status: status },
            { new: true } // Return the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ msg: 'Application not found.' });
        }

        res.json({ msg: `Application updated to ${status}.`, application: updatedApplication });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

 
router.get('/leave/pending', wardenAuth, async (req, res) => {
    try {
        const pendingLeaves = await LeaveApplication.find({ status: 'Pending' })
            .populate('student', ['username', 'email', 'studentId']) // Show who submitted it
            .sort({ submissionDate: 1 });

        res.json(pendingLeaves);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.patch('/leave/:id/status', wardenAuth, async (req, res) => {
    const leaveId = req.params.id;
    const { status, wardenComment } = req.body; 

    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status update.' });
    }

    try {
        const updatedLeave = await LeaveApplication.findByIdAndUpdate(
            leaveId,
            { status, wardenComment },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ msg: 'Leave application not found.' });
        }
        res.json({ msg: `Leave status updated to ${status}.`, leave: updatedLeave });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/profile', auth, authorize(['warden', 'admin']), async (req, res) => {
    try {
        // Crucial: Use populate to join 'user' registration data
        const profile = await WardenProfile.findOne({ user: req.user.id })
            .populate('user', ['username', 'email']); 

        if (!profile) {
            return res.status(404).json({ msg: 'Warden profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/profile', wardenAuth, async (req, res) => {
    // These are the editable fields the warden submits
    const { staffId, assignedBlock, contactNumber } = req.body;
    
    // Use 'contactNumber' for the backend model
    const profileFields = { 
        user: req.user.id, 
        staffId, 
        assignedBlock, 
        contactNumber
    };
    
    try {
        let profile = await WardenProfile.findOne({ user: req.user.id });

        if (profile) {
            // Update existing profile
            profile = await WardenProfile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true } 
            ).populate('user', ['username', 'email']); 
            
            return res.json(profile);
        }
        
        // Create new profile
        profile = new WardenProfile(profileFields);
        await profile.save();
        
        // Populate before returning
        const finalProfile = await WardenProfile.findById(profile._id).populate('user', ['username', 'email']);
        
        res.json(finalProfile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 