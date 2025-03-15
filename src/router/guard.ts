// 路由前置守卫, 前置守卫函数在 redirect 重定向后, 路由跳转前执行
import router from '@/router'
import { useUserStore } from '@/stores/user'
// import { useTabStore } from '@/stores/tab'
//! const userStore = useUserStore()
import { WHITE_LIST } from '@/constants'
import { useTabStore } from '@/stores/tab'

// 进度条组件
import ProgressBar from '@/utils/ProgressBar.vue'
import { createVNode, render } from 'vue'
const barVNode = createVNode(ProgressBar)
render(barVNode, document.body)

// router.beforeEach(
//   (
//     to /** (@/router/index.ts
//     createRouter
//     RouterOptions.routes 重定向后的) 目的路由 */,
//     from /** 源路由 */,
//     next /** 放行函数 */,
//   ) => {
//     const userStore = useUserStore()
//     if (!whiteList.has(to.path) && !userStore.token /**  !sessionStorage.getItem('token') */) {
//       next('/login') // 重定向到登录页面
//       return
//     }

//     if (
//       userStore.token &&
//       (to.path === '/login' ||
//         (to.meta?.auths &&
//           !userStore.auths.some((auth) => (to.meta.auths as string[]).includes(auth))))
//     ) {
//       next({ name: 'Home' })
//       return
//     }

//     next()
//   } /** guard 前置守卫函数 */,
// )

router.beforeEach((to) => {
  //! "getActivePinia()" was called but there was no active Pinia.
  //! Are you trying to use a store before calling "app.use(pinia)"?
  const userStore = useUserStore()
  if (!WHITE_LIST.has(to.path) && !userStore.token /**  !sessionStorage.getItem('token') */) {
    // vue-router@4 新版本
    // 没有返回值: 放行, 有返回值: 重定向
    barVNode.component?.exposed?.loadStart()
    return { path: '/login' }
  }

  if (
    userStore.token &&
    (to.path === '/login' ||
      (to.meta?.auths &&
        !userStore.auths.some((auth) => (to.meta.auths as string[]).includes(auth))))
  ) {
    barVNode.component?.exposed?.loadStart()
    return { name: 'Home' }
  }

  //! 用户可能刷新页面, 或手动修改地址栏
  //! 所以需要在路由前置守卫这里 addTab, setCurrentTab
  const tabStore = useTabStore()
  const { addTab } = tabStore
  if (to.meta.tagName) {
    const { tagName, icon } = to.meta
    addTab(tagName, icon!, to.path)
  }
  barVNode.component?.exposed?.loadStart()
})

router.afterEach(
  (/** to, from */) => {
    barVNode.component?.exposed?.loadEnd()
  } /** guard 后置守卫函数 */,
)
