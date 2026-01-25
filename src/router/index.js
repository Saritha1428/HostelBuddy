
import { createRouter, createWebHistory } from 'vue-router'

import AnnouncementForm from '../components/AnnouncementForm.vue'
import StudentManagement from '../components/StudentManagement.vue'
import HostelSettings from '../components/HostelSettings.vue'
import ErrorPage from '../components/ErrorPage.vue'
import HelpSupport from '../components/HelpSupport.vue'

const routes = [
  { path: '/', redirect: '/announcements' },
  { path: '/announcements', component: AnnouncementForm },
  { path: '/students', component: StudentManagement },
  { path: '/hostels', component: HostelSettings },
  { path: '/error', component: ErrorPage }, 
  { path: '/help-support', component: HelpSupport }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
