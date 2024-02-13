import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
