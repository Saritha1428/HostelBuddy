// models/StudentProfile.js
const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  // Link to the User document for authentication details
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, required: true },
  currentRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
  contactNumber: { type: String },
  emergencyContact: {
    name: String,
    number: String,
    relationship: String
  }
});

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);