<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <font-awesome-icon :icon="['fas', 'users']" />
        Hostel Buddy
      </router-link>
      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{'bar': true, 'active': isOpen}"></span>
        <span :class="{'bar': true, 'active': isOpen}"></span>
        <span :class="{'bar': true, 'active': isOpen}"></span>
      </div>
      <ul class="nav-menu" :class="{'active': isOpen}">
        <li class="nav-item">
          <router-link to="/hostel-buddy" class="nav-links">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/student-dashboard" class="nav-links">Dashboard</router-link>
        </li> 
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #1BBC9B; /* Theme color background */
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  max-width: 1500px;
  padding: 0 24px;
}

/* Logo and icon styling - white */
.navbar-logo {
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
}

.navbar-logo svg {
  margin-right: 10px;
  margin-left: 0px;
  font-size: 1.2em;
  color: inherit; /* White */
  transition: transform 0.3s ease;
}

.navbar-logo:hover svg {
  transform: scale(1.1);
  color: #e0f8f3; /* Lighter shade for hover */
}

.menu-toggle {
  display: none;
  cursor: pointer;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
}

.nav-item {
  height: 80px;
}

/* Navigation links - white */
.nav-links {
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: all 0.3s ease;
}

.nav-links:hover {
  color: #e0f8f3; /* Lighter shade for hover */
}

.nav-links.router-link-exact-active {
  color: white;
  border-bottom: 3px solid white;
}

/* Mobile menu styles */
@media screen and (max-width: 768px) {
  .menu-toggle {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: white; /* White bars */
    transition: all 0.3s ease-in-out;
  }

  .bar.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .bar.active:nth-child(2) {
    opacity: 0;
  }

  .bar.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 80px;
    flex-direction: column;
    background-color: #1BBC9B; /* Theme color */
    width: 100%;
    height: calc(100vh - 80px);
    transition: all 0.5s ease;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    width: 100%;
    height: auto;
    padding: 20px 0;
  }

  .nav-links {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
    color: white;
  }

  .nav-links:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Subtle hover effect */
    color: white;
  }

  .nav-links.router-link-exact-active {
    border-bottom: none;
    background-color: rgba(255, 255, 255, 0.2); /* Active state */
  }
}
</style>