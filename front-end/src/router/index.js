import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Photo from '../views/Photo.vue'
import Admin from '../views/Admin.vue'
import About from '../views/About.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/photo/:id',
    name: 'photo',
    component: Photo
  },
  {
      path: '/admin',
      name: 'Admin',
      component: Admin
  },
  {
      path: '/about',
      name: 'About',
      component: About
  },

  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
