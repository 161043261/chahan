// 路由前置守卫, 前置守卫函数在 redirect 重定向后, 路由跳转前执行
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useTabStore } from '@/stores/tab'
//! const userStore = useUserStore()
const whiteList = new Set<string>(['/login'])

// router.beforeEach(
//   (
//     to /** (@/router/index.ts
//     createRouter
//     RouterOptions.routes 重定向后的) 目的路由 */,
//     from /** 源路由 */,
//     next /** 放行函数 */,
//   ) => {
//     if (import.meta.env.DEV) {
//       console.log('@/router/guard.ts: from:', from)
//       console.log('@/router/guard.ts: to:', to)
//     }
//     const userStore = useUserStore()
//     if (!whiteList.has(to.path) && !userStore.token /**  !sessionStorage.getItem('token') */) {
//       next('/login') // 重定向到登录页面
//       return
//     }

//     if (
//       userStore.token &&
//       (to.path === '/login' ||
//         (to.meta?.auths &&
//           !userStore.roles.some((role) => (to.meta.auths as string[]).includes(role))))
//     ) {
//       next({ name: 'Home' })
//       return
//     }

//     next()
//   } /** guard 前置守卫函数 */,
// )

router.beforeEach((to) => {
  if (import.meta.env.DEV) {
    console.log('@/router/guard.ts: to:', to)
  }
  //! "getActivePinia()" was called but there was no active Pinia.
  //! Are you trying to use a store before calling "app.use(pinia)"?
  const userStore = useUserStore()
  if (!whiteList.has(to.path) && !userStore.token /**  !sessionStorage.getItem('token') */) {
    // vue-router@4 新版本
    // 没有返回值: 放行, 有返回值: 重定向
    return { path: '/login' }
  }

  if (
    userStore.token &&
    (to.path === '/login' ||
      (to.meta?.auths &&
        !userStore.roles.some((role) => (to.meta.auths as string[]).includes(role))))
  ) {
    return { name: 'Home' }
  }

  const tabStore = useTabStore()
})
