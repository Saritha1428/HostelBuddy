// server.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(cors()); // Allow cross-origin requests from Vue frontend
app.use(express.json()); // Allows the server to accept JSON in request body

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  });

// Root Route (for testing)
app.get('/', (req, res) => {
  res.send('Hostel Buddy API Running!');
});

// ===========================================
// Define ALL Application Routes 
// ===========================================

// 1. Authentication Routes (Phase 1)
// Handles /api/auth/register and /api/auth/login
app.use('/api/auth', require('./routes/auth')); 

// 2. Generic User Routes (e.g., /api/users/me)
app.use('/api/users', require('./routes/users')); 

// 3. Student Panel Routes (Phase 2)
// Handles routes like /api/student/profile and /api/student/apply-room
app.use('/api/student', require('./routes/student')); 

// 4. Warden/Admin Panel Routes (Phase 3)
// Handles routes like /api/admin/dashboard and /api/admin/leave-approval
app.use('/api/admin', require('./routes/admin')); 

// ===========================================
// Start the Server
// ===========================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});