import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    tagName?: string
    icon?: string
    auths?: string[]
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/LayoutIndex.vue'),
    redirect: {
      name: 'Empty',
    },
    children: [
      {
        path: '/empty',
        name: 'Empty',
        component: () => import('@/views/EmptyIndex.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardIndex.vue'),
        meta: {
          tagName: '数据看板',
          icon: 'DataScreen',
        },
      },
      {
        path: '/chahan/monitor',
        name: 'Monitor',
        component: () => import('@/views/chahan/ChahanMonitor.vue'),
        meta: {
          tagName: '炒饭机器人监控',
          icon: 'SurveillanceCameras',
        },
      },
      {
        path: '/chahan/robot',
        name: 'Robot',
        component: () => import('@/views/chahan/ChahanRobot.vue'),
        meta: {
          tagName: '炒饭机器人管理',
          icon: 'RobotOne',
          // keepAlive: true,
        },
      },
      {
        path: '/chahan/revenue',
        name: 'Revenue',
        component: () => import('@/views/chahan/ChahanRevenue.vue'),
        meta: {
          tagName: '财务报表',
          icon: 'Excel',
        },
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/map/MapIndex.vue'),
        meta: {
          tagName: 'Web 地图',
          icon: 'LocalTwo',
        },
      },
      {
        path: '/operations/order',
        name: 'Order',
        component: () => import('@/views/operations/OrderOperation.vue'),
        meta: {
          tagName: '订单管理',
          icon: 'Order',
        },
      },
      {
        path: '/operations/detail',
        name: 'Detail',
        component: () => import('@/views/operations/order_detail.tsx' /** OrderDetail.vue */),
        meta: {
          tagName: '订单详情',
          icon: 'Find',
        },
      },
      {
        path: '/operations/bill',
        name: 'Bill',
        component: () => import('@/views/operations/bill_operation'),
        meta: {
          tagName: '账单管理',
          icon: 'Bill',
        },
      },

      {
        path: '/repair',
        name: 'Repair',
        component: () => import('@/views/repair/RepairIndex.vue'),
        meta: {
          tagName: '炒饭机器人维修',
          icon: 'Tool',
        },
      },
      {
        path: '/member',
        name: 'Member',
        component: () => import('@/views/member/MemberIndex.vue'),
        // 创建完整路由表, 并使用路由元信息 meta 指定路由权限
        meta: {
          auths: ['admin'],
          tagName: '会员中心',
          icon: 'LightMember',
        },
      },
      {
        path: '/join',
        name: 'Join',
        component: () => import('@/views/join/JoinIndex.vue'),
        meta: {
          auths: ['admin'],
          tagName: '加盟中心',
          icon: 'CooperativeHandshake',
        },
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/system/SystemIndex.vue'),
        meta: {
          tagName: '系统设置',
          icon: 'System',
        },
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal/PersonalIndex.vue'),
        meta: {
          tagName: '我的账号',
          icon: 'People',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    // component: () => import('@/views/LoginIndex.vue'),
    component: () => import('@/views/login_index.tsx'),
  },
  {
    path: '/:pathMatch(.*)*', // 匹配未定义的任意路由
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

export default routes
