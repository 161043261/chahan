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
    // component: () => import('@/layouts/LayoutIndex'),
    redirect: {
      name: 'Empty',
    },
    children: [
      {
        path: '/empty',
        name: 'Empty',
        component: () => import('@/views/EmptyIndex.vue'),
        // component: () => import('@/views/EmptyIndex'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardIndex.vue'),
        // component: () => import('@/views/dashboard/DashboardIndex'),
        meta: {
          tagName: '数据看板',
          icon: 'DataScreen',
        },
      },
      {
        path: '/chahan',
        name: 'Chahan',
        component: () => import('@/views/chahan/ChahanIndex.vue'),
        meta: {
          tagName: '炒饭机器人列表',
          icon: 'SurveillanceCameras',
        },
      },
      {
        path: '/chahan/grid',
        name: 'Robot',
        component: () => import('@/views/chahan/RobotGrid.vue'),
        meta: {
          tagName: '炒饭机器人网格',
          icon: 'RobotOne',
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
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/OrderIndex.vue'),
        meta: {
          tagName: '订单管理',
          icon: 'Order',
        },
      },
      {
        path: '/order/detail',
        name: 'Detail',
        component: () => import('@/views/order/OrderDetail.vue'),
        // component: () => import('@/views/order/OrderDetail'),
        meta: {
          tagName: '订单详情',
          icon: 'Find',
        },
      },
      {
        path: '/order/add',
        name: 'FileAddition',
        component: () => import('@/views/order/OrderAdd.vue'),
        // component: () => import('@/views/order/OrderAdd'),
        meta: {
          tagName: '导入订单',
          icon: 'FileAddition',
        },
      },
      {
        path: '/ads',
        name: 'Ads',
        component: () => import('@/views/ads/AdsIndex.vue'),
        meta: {
          tagName: '广告发布',
          icon: 'GoogleAds',
        },
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/system/SystemIndex.vue'),
        meta: {
          auths: ['admin'],
          tagName: '系统设置',
          icon: 'System',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginIndex.vue'),
    // component: () => import('@/views/LoginIndex'),
  },
  {
    path: '/:pathMatch(.*)*', // 匹配未定义的任意路由
    redirect: {
      name: 'Empty',
    },
  },
]

export default routes
