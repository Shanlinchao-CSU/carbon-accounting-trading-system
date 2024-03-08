import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DataAuditor from "@/views/DataAuditor.vue";
import Auditing from "@/components/data_auditor/AuditData.vue";
import AuditingHistory from "@/components/data_auditor/AuditHistory.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/data_auditor',
    name: 'data_auditor',
    component: DataAuditor,
    children: [
        {
          path: '/auditing',
          component: Auditing
        },
        {
          path: '/history',
          component: AuditingHistory
        }]
  },
  {
    path: '/login',
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
