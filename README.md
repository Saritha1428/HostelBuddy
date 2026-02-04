# HostelBuddy

HostelBuddy is a full-stack hostel management system designed to simplify day-to-day hostel operations. It provides an easy-to-use web interface for managing students, rooms, and allocations, reducing manual record-keeping and improving efficiency.

The project is built using **Vue.js** for the frontend, **Node.js with Express** for the backend, and **MongoDB** for data storage.

---

## Features

* Student management (add, update, delete student records)
* Room management and allocation
* RESTful API backend
* Responsive frontend built with Vue.js
* MongoDB-based persistent storage

---

## 🛠️ Tech Stack

**Frontend**

* Vue.js
* Vite
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

---

## Project Structure

```
HostelBuddy/
│── frontend/        # Vue.js frontend
│── backend/         # Express.js backend
│   ├── routes/      # API routes
│   ├── models/      # MongoDB schemas
│   ├── controllers/ # Request handling logic
│   └── server.js    # Entry point
│── README.md
```

---

##  Getting Started

### Prerequisites

* Node.js (v16 or higher recommended)
* MongoDB (local or cloud instance)
* npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Saritha1428/HostelBuddy.git
cd HostelBuddy
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

##  Running the Project

### Start the backend server

```bash
cd backend
npm start
```

### Start the frontend development server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

---

## What I Learned

* Designing and implementing RESTful APIs
* Structuring a full-stack project with clear separation of concerns
* Connecting a Vue.js frontend with an Express backend
* Modeling and managing data using MongoDB
* Debugging and handling real-world application issues

---

##  Future Improvements

* Role-based authentication (admin / student)
* Online fee management
* Notifications and reports
* Deployment to cloud platforms

---

## Author

Saritha

This project was built as a practical, real-world application to strengthen full-stack web development skills.
