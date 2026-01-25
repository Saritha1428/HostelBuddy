<template>
  <div class="admin-profile">
      <Navbar_warden />
      <main>
          <div class="profile-container">
              <div class="profile-header">
                  <div class="avatar-container">
                      <img :src="warden.avatar" alt="Warden Avatar" class="avatar">
                      <button @click="changeAvatar" class="avatar-edit-btn">
                          <i class="fas fa-camera"></i>
                      </button>
                  </div>
                  
                  <div class="profile-info">
                      <h1 v-if="loading">Loading...</h1>
                      <h1 v-else>{{ warden.name || warden.user.username || 'Hostel Warden' }}</h1>
                      <p class="role">Hostel Warden</p>
                      <p class="joined-date">Warden since {{ warden.joinedDate || 'N/A' }}</p>
                  </div>
                  <button @click="toggleEditMode" class="edit-profile-btn">
                      {{ editMode ? 'Cancel' : 'Edit Profile' }}
                  </button>
              </div>

              <div class="profile-content">
                  <div class="profile-section">
                      <div class="section-header">
                          <h2><i class="fas fa-user-circle"></i> Personal Details</h2>
                          <button v-if="editMode" @click="saveProfile" class="save-btn">
                              Save Changes
                          </button>
                      </div>
                      
                      <div class="details-grid">
                          <div class="detail-item">
                              <label>Full Name (From Registration)</label>
                              <p v-if="loading">Loading...</p>
                              <p v-else>{{ warden.name }}</p>
                          </div>
                          
                          <div class="detail-item">
                              <label>Email (Login ID)</label>
                              <p v-if="loading">Loading...</p>
                              <p v-else>{{ warden.email }}</p>
                          </div>
                          
                          <div class="detail-item">
                              <label>Phone</label>
                              <input v-if="editMode" v-model="warden.phone" type="tel">
                              <p v-else-if="loading">Loading...</p>
                              <p v-else>{{ warden.phone || 'N/A' }}</p>
                          </div>
                          
                          </div>
                  </div>

                  <div class="profile-section">
                      <h2><i class="fas fa-briefcase"></i> Professional Details</h2>
                      <div class="details-grid">
                          <div class="detail-item">
                              <label>Staff ID</label>
                              <input v-if="editMode" v-model="warden.wardenId" type="text">
                              <p v-else-if="loading">Loading...</p>
                              <p v-else>{{ warden.wardenId || 'N/A' }}</p>
                          </div>
                          
                          <div class="detail-item">
                              <label>Assigned Block</label>
                              <input v-if="editMode" v-model="warden.department" type="text">
                              <p v-else-if="loading">Loading...</p>
                              <p v-else>{{ warden.department || 'N/A' }}</p>
                          </div>
                          
                          </div>
                  </div>
                  </div>
          </div>
      </main>
      <Footer />
      </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import Navbar_warden from '../../../components/Navbar_warden.vue';
  import axios from 'axios'; // CRITICAL: Import Axios
  
  export default {
      name: 'AdminProfile',
      components: {
          Navbar_warden,
          Footer
      },
      data() {
          return {
              editMode: false,
              loading: true, // New loading state
              showChangePassword: false,
              showTwoFactorModal: false,
              twoFactorCode: '',
              password: {
                  current: '',
                  new: '',
                  confirm: ''
              },
              warden: {
                  // Initialize state matching the structure returned by the API
                  user: { username: '', email: '' }, // Populated registration data
                  staffId: ' ',      // Mapped to backend 'staffId'
                  assignedBlock:' ', // Mapped to backend 'assignedBlock' (formerly department)
                  phone: ' ',        // Mapped to backend 'contactNumber'
                  
                  // Fields not currently in backend model (Keep for display)
            
                  avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
              },
              originalWarden: {} // Used to revert changes if user cancels edit
          }
      },
      created() {
          this.fetchProfileData(); // Start fetching data on component load
      },
      methods: {
          // 1. NEW METHOD: Fetch Data from Backend (GET /api/admin/profile)
          async fetchProfileData() {
              const token = localStorage.getItem('token');
              if (!token) { 
                  this.$router.push({ name: 'Login' });
                  return;
              }
              this.loading = true;
  
              try {
                  // CRITICAL: Call the Warden/Admin specific endpoint
                  const response = await axios.get('http://localhost:3000/api/admin/profile', {
                      headers: { 'x-auth-token': token }
                  });
  
                  const apiData = response.data;
  
                  // Map API data (from WardenProfile and User tables) to frontend state
                  this.warden = {
                      ...this.warden, // Keep existing static data (like avatar)
                      ...apiData,
                      name: apiData.user.username,
                      email: apiData.user.email,
                      phone: apiData.contactNumber, // Map backend 'contactNumber' to frontend 'phone'
                      wardenId: apiData.staffId, // Map backend 'staffId' to frontend 'wardenId'
                      department: apiData.assignedBlock // Map backend 'assignedBlock' to frontend 'department'
                  };
                  
              } catch (error) {
                  if (error.response && error.response.status === 404) {
                      console.log('Warden Profile not yet created. Using defaults.');
                      // If 404, we still try to pull name/email from token/local storage
                      const userData = JSON.parse(localStorage.getItem('user')) || {};
                      this.warden.name = userData.username || 'Hostel Warden';
                  } else {
                      console.error('Failed to fetch Warden profile:', error);
                  }
              } finally {
                  this.loading = false;
              }
          },
          
          // 2. UPDATED METHOD: Save Profile (POST /api/admin/profile)
          async saveProfile() {
              const token = localStorage.getItem('token');
              if (!token) return;
  
              // Data mapping back to the WardenProfile.js structure
              const dataToSave = {
                  staffId: this.warden.wardenId,
                  assignedBlock: this.warden.department, // Map frontend 'department' back to backend 'assignedBlock'
                  contactNumber: this.warden.phone,      // Map frontend 'phone' back to backend 'contactNumber'
              };
  
              try {
                  // CRITICAL: Use the POST endpoint for creation/update
                  await axios.post('http://localhost:3000/api/admin/profile', dataToSave, {
                      headers: { 'x-auth-token': token }
                  });
  
                  alert('Profile updated successfully!');
  
                  // FIX: Refresh the displayed data to reflect changes immediately (Persistence)
                  await this.fetchProfileData(); 
                  
                  this.editMode = false;
  
              } catch (error) {
                  console.error('Error saving Warden profile:', error.response ? error.response.data : error.message);
                  alert('Failed to save profile. Check console for details.');
              }
          },
  
          // 3. UPDATED METHOD: Toggle Edit Mode (Uses new 'warden' structure)
          toggleEditMode() {
              if (!this.editMode) {
                  // Save current state before editing
                  this.originalWarden = JSON.parse(JSON.stringify(this.warden));
              } else {
                  // If canceling, revert to original data
                  this.warden = JSON.parse(JSON.stringify(this.originalWarden));
              }
              this.editMode = !this.editMode;
          },
          
          // ... (Other helper methods remain unchanged)
          changeAvatar() { /* ... */ },
          updatePassword() { /* ... */ },
          enableTwoFactor() { /* ... */ }
      }
  };
  </script>

<style scoped>
.admin-profile {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1BBC9B;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1BBC9B;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-edit-btn:hover {
  background: #16a085;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1BBC9B;
}

.role {
  margin: 0.25rem 0;
  font-weight: 500;
  color: #555;
}

.joined-date {
  margin: 0;
  color: #777;
  font-size: 0.9rem;
}

.edit-profile-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.edit-profile-btn:hover {
  background: #16a085;
}

.profile-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.profile-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.profile-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #1BBC9B;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.save-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.save-btn:hover {
  background: #16a085;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  margin-bottom: 1rem;
}

.detail-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.detail-item p {
  margin: 0;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.detail-item input,
.detail-item textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.detail-item textarea {
  min-height: 100px;
}

.security-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.security-btn {
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.security-btn:hover {
  border-color: #1BBC9B;
  color: #1BBC9B;
}

.security-btn i {
  font-size: 1.2rem;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  position: relative;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.submit-btn:hover {
  background: #16a085;
}

.two-factor-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.qr-code {
  text-align: center;
}

.qr-code img {
  width: 200px;
  height: 200px;
  margin-bottom: 0.5rem;
}

.qr-code p {
  margin: 0;
  color: #666;
}

.secret-key {
  font-family: monospace;
  background: #f5f5f5;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .avatar-container {
    margin: 0 auto;
  }
  
  .profile-info {
    text-align: center;
  }
  
  .security-actions {
    flex-direction: column;
  }
  
  .two-factor-content {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>