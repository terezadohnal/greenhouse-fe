import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import SensorsView from '@/views/SensorsView.vue';
import LoginView from '@/views/LoginView.vue';
import SigninView from '@/views/SigninView.vue';
import LandingView from '@/views/LandingView.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/sensors',
    name: 'sensors',
    component: SensorsView,
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
