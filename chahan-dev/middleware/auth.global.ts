import { useTabState } from '~/composables/useTabStore'
import { useUserState } from '~/composables/useUserStore'
import { getTime } from '~/utils'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`[${getTime()}]`, to.path, '<==', from.path)
  const whitelist = useRuntimeConfig().public.whitelist
  const { username, menuList, token } = useUserState()
  if (import.meta.dev) {
    console.log('username:', username.value, ', token:', token?.value)
  }

  if (whitelist.includes(to.path)) {
    return
  }

  if (
    // 不在白名单, 客户端, 未登录
    (import.meta.client && !sessionStorage.getItem('token')) ||
    // 已登录, 但 cookie 异常
    !username.value ||
    !menuList.value
  ) {
    return navigateTo('/login')
  }

  if (import.meta.client && to.path === '/') {
    return navigateTo('/empty')
  }
  const tabState = useTabState()
  const { addTab } = tabState
  const item = menuList.value.find((item) => item.url === to.path)
  if (item) {
    const { icon, name } = item
    addTab(name, icon, to.path)
  }
})
