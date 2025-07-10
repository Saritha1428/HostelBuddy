<template>
  <div class="dashboard">
    <h1>📢 Announcement Dashboard</h1>

    <div class="dashboard-container">
      <!-- Create Announcement Section -->
      <div class="create-announcement">
        <h2>📝 Create Announcement</h2>

        <label>Title</label>
        <input v-model="title" placeholder="e.g., Important Notice: Water Supply" />

        <label>Description</label>
        <textarea v-model="description" placeholder="Provide detailed information about the announcement..."></textarea>

        <label>Target Audience</label>
        <div class="audience-buttons">
          <button
            v-for="aud in ['All', 'Students', 'Mess Staff']"
            :key="aud"
            :class="{ active: audience === aud }"
            @click="audience = aud"
          >
            {{ aud }}
          </button>
        </div>

        <label>Schedule for later</label>
        <div class="schedule-toggle">
          <input type="checkbox" v-model="scheduleLater" />
          <span>Post this announcement at a future date and time.</span>
          <input v-if="scheduleLater" type="datetime-local" v-model="scheduleDate" />
        </div>

        <div class="action-buttons">
          <button @click="resetForm">🔁 Clear</button>
          <button class="post" @click="postAnnouncement">📤 Post Now</button>
        </div>
      </div>

      <!-- Past Announcements Section -->
      <div class="past-announcements">
        <h2>🔁 Past Announcements</h2>
        <div v-for="(ann, i) in announcements" :key="i" class="announcement-card">
          <h3>{{ ann.title }}</h3>
          <small>{{ timeAgo(ann.timestamp) }}</small>
          <p>{{ ann.description }}</p>
          <div class="audience-tag">{{ ann.audience }}</div>
          <div class="posted-time">
            <span v-if="ann.scheduleDate">📅 Scheduled for {{ ann.scheduleDate }}</span>
            <span v-else>⚡ Posted Immediately</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="live-preview">
      <h2>👁️ Live Preview</h2>
      <div class="preview-card">
        <h3>{{ title || 'Your Title Here' }}</h3>
        <small>less than a minute ago</small>
        <p>{{ description || 'Your detailed description will appear here…' }}</p>
        <div class="audience-tag">{{ audience }}</div>
        <div class="posted-time">
          <span v-if="scheduleLater && scheduleDate">📅 Scheduled for {{ scheduleDate }}</span>
          <span v-else>⚡ Posted Immediately</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const audience = ref('All')
const scheduleLater = ref(false)
const scheduleDate = ref('')
const announcements = ref([])

const postAnnouncement = () => {
  const ann = {
    title: title.value,
    description: description.value,
    audience: audience.value,
    scheduleDate: scheduleLater.value ? scheduleDate.value : '',
    timestamp: new Date(),
  }
  announcements.value.unshift(ann)
  resetForm()
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  audience.value = 'All'
  scheduleLater.value = false
  scheduleDate.value = ''
}

const timeAgo = (time) => {
  const now = new Date()
  const diff = Math.floor((now - new Date(time)) / 60000)
  if (diff < 1) return 'less than a minute ago'
  if (diff === 1) return '1 minute ago'
  if (diff < 60) return `${diff} minutes ago`
  const hours = Math.floor(diff / 60)
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}
</script>

<style scoped>
.dashboard {
  font-family: 'Segoe UI', sans-serif;
  background: #1e293b;
  color: white;
  padding: 1.5rem;
}

h1 {
  font-size: 2rem;
  color: #f97316;
}

h2 {
  color: #f97316;
  margin-bottom: 1rem;
}

.dashboard-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.create-announcement,
.past-announcements {
  background: #0f172a;
  border-radius: 10px;
  padding: 1.5rem;
  flex: 1;
  min-width: 300px;
}

input, textarea {
  width: 100%;
  margin: 0.4rem 0 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
}

textarea {
  min-height: 80px;
}

.audience-buttons button {
  margin-right: 10px;
  padding: 0.5rem 1rem;
  background: #1e293b;
  border: 1px solid #f97316;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.audience-buttons button.active {
  background: #f97316;
  color: black;
}

.schedule-toggle {
  margin: 1rem 0;
}

.schedule-toggle input[type="datetime-local"] {
  margin-top: 0.5rem;
  background: #1e293b;
  color: white;
}

.action-buttons {
  margin-top: 1rem;
}

button.post {
  background-color: #facc15;
  color: black;
  font-weight: bold;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  margin-right: 0.5rem;
  cursor: pointer;
}

.live-preview {
  background: #0f172a;
  border-radius: 10px;
  margin-top: 2rem;
  padding: 1.5rem;
}

.preview-card,
.announcement-card {
  background: #1e293b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.audience-tag {
  margin-top: 0.5rem;
  display: inline-block;
  padding: 4px 8px;
  background: #334155;
  border-radius: 6px;
  font-size: 0.8rem;
}

.posted-time {
  font-size: 0.75rem;
  margin-top: 0.3rem;
  color: #facc15;
}
</style>

