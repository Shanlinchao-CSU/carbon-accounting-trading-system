import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DataAuditor from "@/views/DataAuditor.vue";
import Admin from "@/views/Admin.vue";
import thirdParty from "@/views/thirdParty.vue";
import Auditing from "@/components/data_auditor/AuditData.vue";
import AuditingHistory from "@/components/data_auditor/AuditHistory.vue";
import HandleRegister from "@/components/admin/HandleRegister.vue";
import UserInformation from "@/components/admin/UserInformation.vue";
import illegalityQuery from "@/components/admin/illegalityQuery.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/aaa',
    name: 'login1',
    component: Login
  },
  {
    path: '/data_auditor',
    name: 'data_auditor',
    component: DataAuditor,
    children: [
        {
          path: 'auditing',
          component: Auditing
        },
        {
          path: 'history',
          component: AuditingHistory
        }]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: 'handle_register',
        component: HandleRegister
      },
      {
        path: 'user_information',
        component: UserInformation
      },
      {
        path: 'illegality_query',
        component: illegalityQuery
      }
    ]
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
