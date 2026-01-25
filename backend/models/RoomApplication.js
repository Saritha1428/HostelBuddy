// models/RoomApplication.js
const mongoose = require('mongoose');

const RoomApplicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    preferredBlock: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        default: 'New admission'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Assigned'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('RoomApplication', RoomApplicationSchema);