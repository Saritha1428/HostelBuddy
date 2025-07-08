import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
