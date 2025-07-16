<template>
  <div class="login-wrapper">
    <transition name="slow-fade" mode="out-in">
      <div key="login" class="login-card">
        <!-- LEFT: Login Form -->
        <div class="login-box">
          <h2 class="title">Sign In</h2>
          <div class="role-selection">
            <button :class="{ active: role === 'Student' }" @click="selectRole('Student')">Student</button>
            <button :class="{ active: role === 'Warden' }" @click="selectRole('Warden')">Warden</button>
          </div>
          <form @submit.prevent="handleLogin">
            <input type="text" placeholder="Email or Phone" v-model="email" required />
            <input type="password" placeholder="Password" v-model="password" required />
            <div class="options">
              <label><input type="checkbox" v-model="remember" /> Remember me</label>
              <a @click.prevent="goToForgot">Forgot password?</a>
            </div>
            <button type="submit" class="btn">Sign In</button>
          </form>
        </div>

        <!-- RIGHT: Welcome Panel -->
        <div class="welcome-box">
          <h3>{{ welcomeTitle }}</h3>
          <p>{{ welcomeText }}</p>
          <button class="btn transparent" @click="goToRegister">Register</button>
        </div>
      </div>
    </transition>

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal v-if="showForgotModal" @close="showForgotModal = false" />
  </div>
</template>

<script>
import ForgotPassword from '../auth/ForgotPassword.vue'

export default {
  name: 'Login',
  components: {
    ForgotPassword
  },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      role: 'Student',
      showForgotModal: false
    };
  },
  computed: {
    welcomeTitle() {
      return this.role === 'Student' ? 'Welcome, Friend!' : 'Welcome, Warden!';
    },
    welcomeText() {
      return this.role === 'Student'
        ? 'Continue your journey with Hostel Buddy.'
        : 'Manage your hostel with ease and control.';
    }
  },
  methods: {
      handleLogin() {
    alert(`Logged in as ${this.role} – ${this.email}`);
    this.$router.push('/student-dashboard');
  },
    selectRole(role) {
      this.role = role;
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToForgot() {
      this.showForgotModal = true;
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e6ebff;
  position: relative;
  overflow: hidden;
}

.login-card {
  display: flex;
  width: 820px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-box {
  width: 55%;
  padding: 40px;
  background: white;
}

.title {
  text-align: center;
  color: #1bbc9b;
  font-size: 24px;
  margin-bottom: 20px;
}

.role-selection {
  display: flex;
  margin-bottom: 20px;
  background: #f0f0f0;
  border-radius: 9999px;
  overflow: hidden;
}
.role-selection button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
  color: #333;
}
.role-selection button.active {
  background: #1bbc9b;
  color: white;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: all 0.5s ease;
}

input:focus {
  border-color: #1bbc9b;
  box-shadow: 0 0 0 3px rgba(27, 188, 155, 0.2);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
  margin-bottom: 15px;
}

.options label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  cursor: pointer;
}

.options input[type="checkbox"] {
  margin: 0;
}

.options a {
  color: #1bbc9b;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.options a:hover {
  color: #0ca488;
}

.btn {
  width: 100%;
  padding: 12px;
  background: #1bbc9b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.4s ease;
}
.btn:hover {
  background: #0ca488;
  transform: translateY(-2px);
}
.btn.transparent {
  background: transparent;
  border: 2px solid white;
}
.btn.transparent:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.welcome-box {
  width: 45%;
  padding: 40px;
  background: #1bbc9b;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

.welcome-box h3 {
  font-size: 22px;
  margin-bottom: 10px;
}
.welcome-box p {
  font-size: 14px;
  margin-bottom: 20px;
}

/* Enhanced Slow Motion Transitions */
.slow-fade-enter-active {
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.slow-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.slow-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.slow-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

/* Additional element animations */
.login-box,
.welcome-box {
  animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>