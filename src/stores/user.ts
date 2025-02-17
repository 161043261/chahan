import { loginApi } from '@/apis/user'
import type { ILoginReqData, IMenuItem } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//? useRouter 只能在组件中使用
//? 组件中可以获取到 router 对象, pinia 中获取不到 router 对象
//// import { useRouter } from 'vue-router'
//// const router = useRouter();

//? 如果希望在 pinia 中使用 router 对象, 可以通过传参的方式
// const login = async (data: LoginReqData, router: Router) => {}

export const useUserStore = defineStore('user', () => {
  //! state
  // 菜单
  const menuList = ref<IMenuItem[]>(JSON.parse(sessionStorage.getItem('menuList') ?? '[]'))
  // token
  const token = ref<string>(sessionStorage.getItem('token') ?? '')
  // 昵称
  const nickname = ref<string>(sessionStorage.getItem('nickname') ?? '')
  // 权限
  const roles = ref<string[]>(JSON.parse(sessionStorage.getItem('roles') ?? '[]'))

  //! actions
  const login = async (data: ILoginReqData) => {
    try {
      const resData = await loginApi(data)
      if (import.meta.env.DEV) {
        console.log('@/stores/user.ts: resData:', resData)
      }
      const {
        data: {
          menuList: menuList_,
          token: token_,
          user: { nickname: nickname_, roles: roles_ },
        },
        message,
      } = resData

      if (import.meta.env.DEV) {
        // console.log('@/stores/user.ts: code:', code_)
        // console.log('@/stores/user.ts: menuList:', menuList_)
        // console.log('@/stores/user.ts: token:', token_)
        // console.log('@/stores/user.ts: nickname:', nickname_)
        // console.log('@/stores/user.ts: roles:', roles_)
        console.log('@/stores/user.ts: message:', message)
      }

      menuList.value = menuList_
      token.value = token_
      nickname.value = nickname_
      roles.value = roles_

      // 页面刷新后, pinia 中的数据 (state) 丢失
      // pinia 持久化
      // 1. pinia 中的数据 (state) 是响应式的
      // 2. pinia 存取速度快
      sessionStorage.setItem('menuList', JSON.stringify(menuList_))
      sessionStorage.setItem('token', token_)
      sessionStorage.setItem('nickname', nickname_)
      sessionStorage.setItem('roles', JSON.stringify(roles_))

      //// router.push('/')
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('@/stores/user.ts', err)
      }
    }
  }

  const logout = () => {
    menuList.value = []
    token.value = ''
    nickname.value = ''
    roles.value = []
    // sessionStorage.removeItem('token')
    sessionStorage.clear()
  }

  //! getters (使用 computed 计算属性)

  return {
    menuList,
    token,
    nickname,
    roles,
    login,
    logout,
  }
})
