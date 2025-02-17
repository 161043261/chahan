import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/LayoutIndex.vue'),
    redirect: {
      name: 'Dashboard',
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardIndex.vue'),
      },
      {
        path: '/chahan/monitor',
        name: 'Monitor',
        component: () => import('@/views/chahan/ChahanMonitor.vue'),
      },
      {
        path: '/chahan/robot',
        name: 'Robot',
        component: () => import('@/views/chahan/ChahanRobot.vue'),
      },
      {
        path: '/chahan/finance',
        name: 'Finance',
        component: () => import('@/views/chahan/ChahanFinance.vue'),
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/map/MapIndex.vue'),
      },
      {
        path: '/operations/order',
        name: 'Order',
        component: () => import('@/views/operations/OrderOperation.vue'),
      },
      {
        path: '/operations/detail',
        name: 'Detail',
        component: () => import('@/views/operations/OrderDetail.vue'),
      },
      {
        path: '/operations/bill',
        name: 'Bill',
        component: () => import('@/views/operations/BillOperation.vue'),
      },

      {
        path: '/repair',
        name: 'Repair',
        component: () => import('@/views/repair/RepairIndex.vue'),
      },
      {
        path: '/member',
        name: 'Member',
        component: () => import('@/views/member/MemberIndex.vue'),
        // 创建完整路由表, 并使用路由元信息 meta 指定路由权限
        meta: {
          authorization: ['admin'],
        },
      },
      {
        path: '/join',
        name: 'Join',
        component: () => import('@/views/join/JoinIndex.vue'),
        meta: {
          authorization: ['admin'],
        },
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/system/SystemIndex.vue'),
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal/PersonalIndex.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginIndex.vue'),
  },
  {
    path: '/:pathMatch(.*)*', // 匹配未定义的任意路由
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default routes
