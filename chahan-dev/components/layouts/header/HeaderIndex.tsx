import { Remind, User, Power } from '@icon-park/vue-next'
import { ElBadge, ElDropdown, ElDropdownMenu, ElDropdownItem, ElSwitch } from 'element-plus'
import { useUserState } from '~/composables/useUserStore'
import { useRouter } from 'vue-router'
import { onBeforeUnmount, ref, defineComponent } from 'vue'
import HeaderTabs from './HeaderTabs'

export default defineComponent({
  emits: ['switchWatermark'],

  setup(props, { emit }) {
    const userState = useUserState()
    const { username } = userState
    const router = useRouter()
    const isAlive = ref(false)

    const animated = ref<boolean>(false)
    let timer: number | null | NodeJS.Timeout = null

    // 资源清理
    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })

    /**
     * @description 节流 throttle
     */
    const handleClick = () => {
      if (timer) {
        return
      }
      animated.value = true
      timer = setTimeout(() => {
        animated.value = false
        timer = null
      }, 1000)
    }

    const enum Command {
      User = 'user',
      Logout = 'Logout',
    }

    const handleCommand = async (command: Command) => {
      switch (command) {
        case Command.User:
          // router.push('/user')
          break

        case Command.Logout:
          userState.logout()
          router.replace('/login')
      }
    }

    return () => (
      <div class="mt-[10px]">
        <div class="flex flex-row-reverse items-center">
          <div class="mr-[20px] flex gap-[20px]">
            {/* inlinePrompt={true} 等价于 inlinePrompt */}
            <ElSwitch
              v-model={isAlive.value}
              inlinePrompt={true}
              style={{
                '--el-switch-on-color': 'var(--color-green)',
                '--el-switch-off-color': 'var(--color-1st)',
              }}
              activeText={'水印开'}
              inactiveText={'水印关'}
              onChange={() => emit('switchWatermark', isAlive.value)}
            ></ElSwitch>

            <ElBadge
              isDot
              class={[
                'mt-[5px]',
                'cursor-pointer',
                'duration-1000',
                animated.value ? 'animate__animated animate__swing' : '',
              ]}
            >
              <div onClick={handleClick}>
                <Remind theme="filled" size={25} fill="#b8e986" strokeWidth={3}></Remind>
              </div>
            </ElBadge>

            <ElDropdown onCommand={handleCommand}>
              {{
                default: () => (
                  <span class="cursor-pointer text-lg outline-none"> 欢迎: {username.value} </span>
                ),
                dropdown: () => (
                  <ElDropdownMenu>
                    <ElDropdownItem icon={User} command={Command.User}>
                      我的账号
                    </ElDropdownItem>
                    <ElDropdownItem icon={Power} command={Command.Logout}>
                      退出登录
                    </ElDropdownItem>
                  </ElDropdownMenu>
                ),
              }}
            </ElDropdown>
          </div>
        </div>
        <HeaderTabs />
      </div>
    )
  },
})
