<template>
  <div id="app">
    <!-- <nav class="navbar">
      <router-link to="/announcements" class="nav-link">📢 Announcements</router-link>
      <router-link to="/students" class="nav-link">👨‍🎓 Student Management</router-link>
      <router-link to="/hostels" class="nav-link"> 🏠 Hostel Settings</router-link>
      <router-link to="/error" class="nav-link">❗ Error Page</router-link>
      <router-link to="/help-support" class="nav-link">❓ Help & Support</router-link>
    </nav> -->

    
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style> 

/* .navbar {
  background-color: #f0fdf4;
  padding: 1rem;
  display: flex;
  gap: 1rem;
} 
.nav-link {
  text-decoration: none;
  font-weight: bold;
  color: #16a34a;
}  */


.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
