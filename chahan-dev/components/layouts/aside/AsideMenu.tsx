import './AsideMenu.scss'

import { useUserState } from '~/composables/useUserStore'
import RecursiveChild from './RecursiveChild'
import { ElMenu } from 'element-plus'
import { Rice } from '@icon-park/vue-next'
import { useRouter } from 'vue-router'

export default defineComponent(() => {
  const userState = useUserState()
  const { menuList } = userState
  const route = useRoute()
  const router = useRouter()
  const handleClick = () => router.push('/')
  return () => (
    <div>
      <div
        class="flex h-[70px] cursor-pointer items-center justify-center gap-[10px] px-[10px]"
        onClick={handleClick}
      >
        <Rice theme="filled" size="48" fill="#b8e986" strokeWidth={3} />
        <h1 class="text-[20px]">炒饭机器人</h1>
      </div>

      <ElMenu class="menu-list !border-none" router={true} defaultActive={route.path}>
        {menuList.value.map((item) => (
          <RecursiveChild key={item.url} item={item}></RecursiveChild>
        ))}
      </ElMenu>
    </div>
  )
})
