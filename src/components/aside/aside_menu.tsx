import './aside_menu.scss'

import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import RecursiveChild from './recursive_child'
import { ElMenu } from 'element-plus'
import { Rice } from '@icon-park/vue-next'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const { menuList } = storeToRefs(userStore)
    const route = useRoute()
    const router = useRouter()
    const handleClick = () => router.push({ name: 'Home' })

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
  },
})
