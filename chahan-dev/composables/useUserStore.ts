//! useState<T>(init?: () => T | Ref<T>): Ref<T>
//! useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>

// 使用 `import.meta.client` 判断是否为客户端
// 收到警告 Server rendered element contains fewer child nodes than client vdom.

import type { Res } from '~/types/resp'
import type { ILoginBody, IMenuItem } from '~/types/user'

// 必须使用高阶函数
const _useUserState = () => {
  return useState<{
    username: string
    menuList: IMenuItem[]
    token: string
  }>(
    'user', // key
    () => {
      const username = useCookie<string>('username')
      const menuList = useCookie<IMenuItem[]>('menuList')
      // const token = useCookie<string>('token')

      //! sessionStorage is not defined
      // const username = import.meta.client ? (sessionStorage.getItem('username') ?? '') : ''
      // const menuList = (
      //   import.meta.client ? JSON.parse(sessionStorage.getItem('menuList') ?? '[]') : []
      // ) as IMenuItem[]
      const token = import.meta.client ? (sessionStorage.getItem('auth') ?? '') : ''

      return {
        username: username.value,
        menuList: menuList.value,
        token: token,
      }
    }, // initializer
  )
}

async function login(data: ILoginBody) {
  try {
    //! Component is already mounted, please use $fetch instead.
    const res = await $fetch<Res<{ token: string; menuList: IMenuItem[] }>>('/api/user/login', {
      body: data,
      method: 'POST',
    })

    if (!res) {
      throw createError({ message: '登录失败' })
    }
    const {
      data: { menuList: menuList_, token: token_ },
    } = res
    _useUserState().value.username = data.username
    _useUserState().value.menuList = menuList_
    _useUserState().value.token = token_

    ///////////////////////////////////////////////////
    const username = useCookie<string>('username')
    const menuList = useCookie<IMenuItem[]>('menuList')
    // const token = useCookie<string>('token')
    username.value = data.username
    menuList.value = menuList_
    // token.value = token_
    ///////////////////////////////////////////////////

    if (import.meta.client) {
      //   sessionStorage.setItem('username', data.username)
      //   sessionStorage.setItem('menuList', JSON.stringify(menuList_))
      sessionStorage.setItem('token', token_)
    }
  } catch (err) {
    if (import.meta.dev) {
      console.error(err)
    }
  }
}

function reset() {
  _useUserState().value = {
    username: '',
    menuList: [],
    token: '',
  }
  useCookie<string>('username').value = ''
  useCookie<IMenuItem[]>('menuList').value = []
  // useCookie<string>('token').value = ''

  if (import.meta.client) {
    sessionStorage.clear()
  }
}

async function logout() {
  reset()
}

export function useUserState() {
  const userState = _useUserState()
  return {
    username: useCookie<string>('username'),
    menuList: useCookie<IMenuItem[]>('menuList'),
    token: ref(
      import.meta.client ? sessionStorage.getItem('token') : userState.value.token,
      // userState.value.token ?? useCookie('token').value,
    ),
    login,
    reset,
    logout,
  }
}
