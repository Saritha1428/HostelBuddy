<template>
  <div class="landing-page">
    <Navbar />
    <h1>🏡 Hostel Portal</h1>
    <p>Welcome! Choose your action below:</p>
    <div class="buttons">
      <router-link to="/login" class="btn login">Login</router-link>
      <router-link to="/register" class="btn register">Register</router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'

export default {
  name: 'Landing',
  components: { Navbar }
}
</script>

<style scoped>
.landing-page {
  text-align: center;
  margin-top: 5vh;
}
.buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
}
.login {
  background-color: #3498db;
  color: #fff;
}
.register {
  background-color: #2ecc71;
  color: #fff;
}
</style>
