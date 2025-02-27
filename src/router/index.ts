import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DataAuditor from "@/views/DataAuditor.vue";
import Admin from "@/views/Admin.vue";
import thirdParty from "@/views/thirdParty.vue";
import TestView from "@/views/TestView.vue";
import Auditing from "@/components/data_auditor/AuditData.vue";
import AuditingHistory from "@/components/data_auditor/AuditHistory.vue";
import HandleRegister from "@/components/admin/HandleRegister.vue";
import UserInformation from "@/components/admin/UserInformation.vue";
import illegalityQuery from "@/components/admin/illegalityQuery.vue";
import accounting_monitor from "@/components/thirdParty/accounting_monitor.vue";
import transaction_monitor from "@/components/thirdParty/transaction_monitor.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
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
      },
      {
        path: 'transaction_monitor',
        component: transaction_monitor
      },
      {
        path: 'accounting_monitor',
        component: accounting_monitor
      }
    ]
  },
  {
    path: '/thirdParty',
    name: 'thirdParty',
    component: thirdParty,
    children: [
      {
        path: 'transaction_monitor',
        component: transaction_monitor
      },
      {
        path: 'accounting_monitor',
        component: accounting_monitor
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

// router.beforeEach((to,from,next) => {
//   if (to.path === '/' || to.path === '/register') {
//     console.log("123123")
//     return next()
//   }else {
//     if (localStorage.getItem("token") !== null) {
//       console.log("456456")
//       return next()
//     }else {
//       console.log("789789")
//       return next("/")
//     }
//   }
// })

export default router
