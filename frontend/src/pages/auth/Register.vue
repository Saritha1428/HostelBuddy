<template>
  <div class="register-wrapper">
    <transition name="slow-fade" mode="out-in">
      <div key="register" class="register-card">
        <!-- LEFT: Welcome Panel -->
        <div class="side-panel">
          <h2>{{ welcomeTitle }}</h2>
          <p>{{ welcomeText }}</p>
          <button class="btn transparent" @click="goToLogin">Sign In</button>
        </div>

        <!-- RIGHT: Registration Form -->
        <div class="form-container">
          <h2 class="title">Create Account</h2>
          <form @submit.prevent="handleRegister">
            <input type="text" placeholder="Full Name" v-model="fullName" required />
            <input type="email" placeholder="Email" v-model="email" required />
            <input type="password" placeholder="Password" v-model="password" required />
            <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
            <button type="submit" class="btn">Sign Up</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Student'
    };
  },
  computed: {
    welcomeTitle() {
      return this.role === 'Student' ? 'Welcome Back!' : 'Hello Warden!';
    },
    welcomeText() {
      return this.role === 'Student'
        ? 'Enter your personal details to use all site features.'
        : 'Manage your hostel with ease.';
    }
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    alert(`Registered: ${this.fullName}`);
this.goToLogin();

    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  overflow: hidden;
}

.register-card {
  display: flex;
  width: 900px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background: white;
  overflow: hidden;
}

.side-panel {
  width: 45%;
  background: linear-gradient(to right, #1bbc9b, #0ca488);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  animation: fadeInLeft 1s ease;
}

.side-panel h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
.side-panel p {
  font-size: 14px;
  margin-bottom: 30px;
}

.form-container {
  width: 55%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInRight 1s ease;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #1bbc9b;
  text-align: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.5s ease;
}

input:focus {
  border-color: #1bbc9b;
  box-shadow: 0 0 0 3px rgba(27, 188, 155, 0.2);
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
  margin-top: 10px;
  transition: all 0.4s ease;
}

.btn:hover {
  background: #0ca488;
  transform: translateY(-2px);
}

.btn.transparent {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.btn.transparent:hover {
  background: rgba(255,255,255,0.15);
  transform: translateY(-2px);
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

/* Additional animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>