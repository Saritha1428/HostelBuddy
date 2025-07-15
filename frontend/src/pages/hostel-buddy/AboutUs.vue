<template>
  <div class="about-us">
    <Navbar />
    <div class="top-section">
      <p class="breadcrumb">Hostel Buddy / About Us</p>
      <h1>About <span class="highlight">Us</span></h1>

      <div class="tab-container">
        <button :class="{ active: currentTab === 'why' }" @click="currentTab = 'why'">The Why</button>
        <button :class="{ active: currentTab === 'what' }" @click="currentTab = 'what'">The What</button>
        <button :class="{ active: currentTab === 'how' }" @click="currentTab = 'how'">The How</button>
      </div>

      <!-- THE WHY -->
      <div v-if="currentTab === 'why'" class="about-content">
        <div class="text-section">
          <h2>We didn't find the right hostel system,</h2>
          <h2 class="highlight">so we built it for everyone</h2>
          <p>
            That’s how Hostel Buddy came to life. Messy logbooks, miscommunication, lost complaints,
            and confused students — not anymore. Hostel Buddy is designed by students, for students.
            We get the chaos, and we’re here to fix it. Smarter systems. Happier lives.
          </p>
        </div>
        <div class="image-section">
          <img src="@/assets/images/payment.jpg" alt="Hostel Room" />
        </div>
      </div>

      <!-- THE WHAT -->
      <div v-if="currentTab === 'what'" class="about-content">
        <div class="text-section">
          <h2>What is Hostel Buddy?</h2>
          <h2 class="highlight">Your smart hostel companion</h2>
          <p>
            From managing mess schedules, tracking complaints, to finding the perfect roommate —
            Hostel Buddy makes hostel life smooth and simple. Our features are built for both students
            and administrators to stay informed and in control.
          </p>
        </div>
        <div class="image-section">
          <img src="@/assets/images/payment.jpg" alt="Features Overview" />
        </div>
      </div>

      <!-- THE HOW -->
      <div v-if="currentTab === 'how'" class="about-content">
        <div class="text-section">
          <h2>How do we make it work?</h2>
          <h2 class="highlight">By combining tech + student insights</h2>
          <p>
            Hostel Buddy integrates smart web tools with real feedback from hostelers like you.
            We continually update based on student needs. It’s a live platform built on
            experience, empathy, and engineering.
          </p>
        </div>
        <div class="image-section">
          <img src="@/assets/images/payment.jpg" alt="How it works" />
        </div>
      </div>
    </div>

    <div class="bottom-section">
      <div class="image-section">
        <img src="@/assets/images/payment.jpg" alt="Hostel Building" />
      </div>
      <div class="text-section">
        <h2>You wanted better hostel life,</h2>
        <h2 class="highlight">so we started from scratch</h2>
        <p>
          It all began in 2024, when a group of hostelers realized the system was broken. From
          maintenance to mess to roommate matching — everything needed a smart touch. And so,
          Hostel Buddy was born — to bring technology into the hostel world. Now it’s smarter,
          easier, and student-friendly.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const currentTab = ref('why')
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

</script>

<style scoped>
.about-us {
  font-family: 'Segoe UI', sans-serif;
  color: #2c2c2c;
}

.top-section {
  padding: 3rem 2rem;
  background: linear-gradient(to bottom, #f0fdfc, #ffffff);
}

.breadcrumb {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.highlight {
  color: #44d4c5;
}

.tab-container {
  display: flex;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: max-content;
  margin: 1rem 0 2rem 0;
}

.tab-container button {
  padding: 0.8rem 2rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
}

.tab-container .active {
  color: #44d4c5;
  border-bottom: 3px solid #44d4c5;
  font-weight: bold;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.text-section {
  flex: 1;
}

.text-section h2 {
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.text-section p {
  font-size: 1rem;
  color: #555;
  margin-top: 1rem;
}

.image-section {
  flex: 1;
  text-align: center;
}

.image-section img {
  max-width: 100%;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.bottom-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3rem 2rem;
  background: linear-gradient(160deg, #ffffff 60%, #e9fefb 60%);
  flex-wrap: wrap;
  margin-top: 2rem;
}

.bottom-section .text-section h2 {
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.bottom-section .text-section p {
  font-size: 1rem;
  color: #555;
  margin-top: 1rem;
}
</style>