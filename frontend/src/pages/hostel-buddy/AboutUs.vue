<template>
  <div class="about-us">
    <Navbar />
    <div class="top-section ">
      <p class="breadcrumb">Hostel Buddy / About Us</p>
      <h1>About <span class="highlight">Us</span></h1>

      <div class="tab-container">
        <button :class="{ active: currentTab === 'why' }" @click="currentTab = 'why'">The Why</button>
        <button :class="{ active: currentTab === 'what' }" @click="currentTab = 'what'">The What</button>
        <button :class="{ active: currentTab === 'how' }" @click="currentTab = 'how'">The How</button>
      </div>

      <!-- THE WHY -->
      <div v-if="currentTab === 'why'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2>We saw hostel life needed a <span class="highlight">change</span></h2>
            <p>
              Traditional hostel management was stuck in paperwork and chaos – lost complaints,
              endless queues for fees, and miscommunication between students and administration.
              We experienced these problems firsthand during our hostel days.
            </p>
          </div>
          <div class="image-content">
            <img src="https://www.thehivehostels.com/uploads/images/1658301040_7796f3aa4d7819a2f5d5.jpeg" alt="Messy paperwork" />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>So we created a <span class="highlight">digital solution</span></h2>
            <p>
              Hostel Buddy was born from countless late-night discussions in common rooms,
              where we imagined how technology could solve these daily frustrations.
              Our mission: transform hostel living through smart digital tools.
            </p>
          </div>
          <div class="image-content">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Students discussing" />
          </div>
        </div>
      </div>

      <!-- THE WHAT -->
      <div v-if="currentTab === 'what'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2>Your complete hostel <span class="highlight">companion</span></h2>
            <p>
              Hostel Buddy consolidates all aspects of hostel life into one platform –
              from room allocation and fee payments to mess management and maintenance requests.
              No more running between different offices.
            </p>
          </div>
          <div class="image-content">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="App interface" />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>Built for <span class="highlight">students</span> and <span class="highlight">administrators</span></h2>
            <p>
              We designed separate interfaces that serve both students and wardens equally well.
              Students get convenience, wardens get better oversight – everyone wins with
              streamlined operations.
            </p>
          </div>
          <div class="image-content">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="Team working" />
          </div>
        </div>
      </div>

      <!-- THE HOW -->
      <div v-if="currentTab === 'how'" class="content-section">
        <div class="content-row">
          <div class="text-content">
            <h2><span class="highlight">Technology</span> meets real needs</h2>
            <p>
              Our platform combines cloud infrastructure with mobile-first design,
              ensuring reliability and accessibility. We use student feedback loops to
              continuously improve features based on actual hostel experiences.
            </p>
          </div>
          <div class="image-content">
            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" alt="Coding session" />
          </div>
        </div>

        <div class="content-row reverse">
          <div class="text-content">
            <h2>Built by <span class="highlight">hostelers</span>, for <span class="highlight">hostelers</span></h2>
            <p>
              Every feature goes through testing with real students and wardens before launch.
              We maintain regular feedback sessions to ensure Hostel Buddy evolves with
              changing needs in hostel communities.
            </p>
          </div>
          <div class="image-content ">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" alt="Team meeting" />
          </div>
        </div>
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
  background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);
  position: relative;
}

/* Breadcrumb */
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

/* Tabs */
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

/* Sections */
.content-section {
  margin-top: 2rem;
}

.content-row {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.content-row.reverse {
  flex-direction: row-reverse;
}

.text-content {
  flex: 1;
  min-width: 300px;
}

.text-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.image-content {
  flex: 1;
  min-width: 300px;
}

.image-content img {
  width: 85%;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-height: 350px;
  object-fit: cover;
  margin-left: 20px;
}
.image-content img:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .content-row,
  .content-row.reverse {
    flex-direction: column;
    gap: 2rem;
  }

  .text-content,
  .image-content {
    width: 90%;
  }

  .top-section {
    padding: 2rem 1rem;
  }
}

</style>