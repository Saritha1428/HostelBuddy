// backend/models/LeaveApplication.js
const mongoose = require('mongoose');

const LeaveApplicationSchema = new mongoose.Schema({
    student: { // Link to the user who submitted the leave
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: { // The state seen by the warden/admin
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    // Optional field for warden comments
    wardenComment: {
        type: String
    }
});

module.exports = mongoose.model('LeaveApplication', LeaveApplicationSchema);