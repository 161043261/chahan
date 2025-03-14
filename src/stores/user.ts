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
  const auths = ref<string[]>(JSON.parse(sessionStorage.getItem('auths') ?? '[]'))

  //! actions
  const login = async (data: ILoginReqData) => {
    try {
      const resData = await loginApi(data)
      const {
        data: {
          menuList: menuList_,
          token: token_,
          user: { nickname: nickname_, auths: roles_ },
        }
      } = resData

      menuList.value = menuList_
      token.value = token_
      nickname.value = nickname_
      auths.value = roles_

      // 页面刷新后, pinia 中的数据 (state) 丢失
      // pinia 持久化
      // 1. pinia 中的数据 (state) 是响应式的
      // 2. pinia 存取速度快
      sessionStorage.setItem('menuList', JSON.stringify(menuList_))
      sessionStorage.setItem('token', token_)
      sessionStorage.setItem('nickname', nickname_)
      sessionStorage.setItem('auths', JSON.stringify(roles_))
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err)
      }
    }
  }

  const logout = () => {
    menuList.value = []
    token.value = ''
    nickname.value = ''
    auths.value = []
    // sessionStorage.removeItem('token')
    sessionStorage.clear()
  }

  //! getters (使用 computed 计算属性)

  return {
    menuList,
    token,
    nickname,
    auths,
    login,
    logout,
  }
})
