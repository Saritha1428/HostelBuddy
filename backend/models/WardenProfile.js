// backend/models/WardenProfile.js
const mongoose = require('mongoose');

const WardenProfileSchema = new mongoose.Schema({
    // Links the profile to the authenticated User document
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    staffId: { // Unique identifier for staff
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // The specific hostel block the warden is responsible for
    assignedBlock: {
        type: String,
        default: 'General' 
    },
    contactNumber: {
        type: String
    },
    // Additional profile fields can go here
    joinDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WardenProfile', WardenProfileSchema);